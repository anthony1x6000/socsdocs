import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { drizzle } from 'drizzle-orm/d1'
import * as schema from './db/schema'
import { QueryClient } from '@tanstack/query-core'

type Bindings = {
  socs_db: D1Database
  socs_r2: R2Bucket
  BETTER_AUTH_SECRET: string
  BETTER_AUTH_URL: string
  FRONTEND_URL: string
  NODE_ENV?: string 
}

type Variables = {
  auth: ReturnType<typeof betterAuth>
  queryClient: QueryClient
  session: any
}

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>()

// Enable Hono logger
app.use('*', logger())

// Global QueryClient instance for caching across requests within the same isolate
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
})

/**
 * CORS must be registered before the auth handler to handle preflight OPTIONS requests.
 */
app.use('/api/*', cors({
  origin: (origin, c) => {
    console.log(`[CORS] Request from origin: ${origin}, allowed: ${c.env.FRONTEND_URL}`);
    return c.env.FRONTEND_URL;
  },
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['POST', 'GET', 'OPTIONS', 'PUT', 'DELETE'],
  credentials: true,
}))

app.use('*', async (c, next) => {
  console.log(`[Request] ${c.req.method} ${c.req.url}`);
  
  if (!c.env.BETTER_AUTH_SECRET) {
    console.error("[Config] CRITICAL: Missing BETTER_AUTH_SECRET");
  }
  
  console.log(`[Config] BETTER_AUTH_URL: ${c.env.BETTER_AUTH_URL}`);
  console.log(`[Config] FRONTEND_URL: ${c.env.FRONTEND_URL}`);
  console.log(`[Config] NODE_ENV: ${c.env.NODE_ENV}`);

  const db = drizzle(c.env.socs_db, { schema });
  
  const authInstance = betterAuth({
    database: drizzleAdapter(db, {
      provider: "sqlite",
      schema: {
        user: schema.user,
        session: schema.session,
        account: schema.account,
        verification: schema.verification
      }
    }),
    experimental: {
      joins: true 
    },
    emailAndPassword: { enabled: true },
    plugins: [
    ],
    onLog: (log: { level: 'debug' | 'info' | 'warn' | 'error'; message: string; data?: any }) => {
      console.log(`[Better-Auth] [${log.level}] ${log.message}`, log.data || "");
    },
    secret: c.env.BETTER_AUTH_SECRET, 
    baseURL: c.env.BETTER_AUTH_URL,
    trustedOrigins: [c.env.FRONTEND_URL].filter(Boolean) as string[],
    advanced: {
      defaultBearerToken: true,
      useSecureCookies: c.env.NODE_ENV === "production",
      ipAddress: {
        ipAddressHeaders: ["CF-Connecting-IP", "x-forwarded-for"],
      },
    }
  });

  c.set('auth', authInstance as any);
  c.set('queryClient', queryClient);
  await next();
})

/**
 * Middleware to ensure the user is authenticated.
 * This middleware extracts the 'Authorization' header, validates the session 
 * using Better Auth, and attaches the session object to the context.
 * 
 * @param {Context} c - The Hono context object.
 * @param {Next} next - The next middleware function.
 * @returns {Promise<Response | void>} Returns a 401 response if authentication fails.
 * 
 * @example
 * app.get('/api/protected', authMiddleware, (c) => {
 *   const session = c.get('session');
 *   return c.json({ user: session.user });
 * });
 */
const authMiddleware = async (c: any, next: any) => {
  const auth = c.get('auth');
  const authHeader = c.req.header('Authorization');

  if (!authHeader) {
    return c.json({ error: 'Unauthorized: Missing Authorization header' }, 401);
  }

  try {
    // Better Auth handles Request objects or headers. 
    // We pass the raw headers for validation.
    const session = await auth.api.getSession({ 
      headers: c.req.raw.headers 
    });

    if (!session) {
      return c.json({ error: 'Unauthorized: Invalid session' }, 401);
    }

    c.set('session', session);
    await next();
  } catch (err) {
    console.error("[Auth] Internal error during session check:", err);
    return c.json({ error: 'Unauthorized: Auth check failed' }, 401);
  }
};

app.on(['POST', 'GET'], '/api/auth/**', (c) => {
  const auth = c.get('auth');
  return auth.handler(c.req.raw);
})

/**
 * Endpoint for uploading profile pictures to R2.
 * Requires authentication via authMiddleware.
 */
app.post('/api/upload-image', authMiddleware, async (c) => {
  const session = c.get('session');
  
  const formData = await c.req.formData();
  const file = formData.get('file');

  if (!file || typeof file === 'string') {
    return c.json({ error: 'No file uploaded' }, 400);
  }

  const fileObject = file as File;

  const key = `profile-pics/${session.user.id}-${Date.now()}-${fileObject.name}`;
  await c.env.socs_r2.put(key, fileObject.stream(), {
    httpMetadata: { contentType: fileObject.type }
  });

  const origin = new URL(c.req.url).origin;
  const url = `${origin}/api/images/${key}`;
  return c.json({ url });
})

/**
 * Endpoint to serve images from R2.
 * Extracts the object key from the path and streams the content from R2.
 */
app.get('/api/images/*', async (c) => {
  const key = c.req.path.replace('/api/images/', '');
  const object = await c.env.socs_r2.get(key);

  if (!object) {
    return c.text('Not Found', 404);
  }

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set('etag', object.httpEtag);

  return new Response(object.body, { headers });
})

/**
 * Post to Chat.
 * Saves a new message to the database and links it to the authenticated user.
 * 
 * @param {string} content - The message content sent in the request body.
 * @returns {Promise<Message>} The newly created message object.
 */
app.post('/api/chat', authMiddleware, async (c) => {
  const session = c.get('session');
  const db = drizzle(c.env.socs_db, { schema });
  
  const { content } = await c.req.json();

  const newMessage = await db.insert(schema.chatMessages).values({
    id: crypto.randomUUID(),
    content,
    senderId: session.user.id,
    date: new Date(),
  }).returning().get();

  return c.json(newMessage);
});

/**
 * Get Chat Messages.
 * Retrieves the last 100 messages along with sender profile information.
 * 
 * @returns {Promise<Array<Message & { sender: User }>>} A list of messages with sender details.
 */
app.get('/api/chat', authMiddleware, async (c) => {
  const db = drizzle(c.env.socs_db, { schema });

  const messages = await db.query.chatMessages.findMany({
    with: {
      sender: true
    },
    orderBy: (chatMessages, { asc }) => [asc(chatMessages.date)],
    limit: 100,
  });

  return c.json(messages);
});


export default app;