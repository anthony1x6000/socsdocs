import { Hono } from 'hono'
import { cors } from 'hono/cors'
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
}

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>()

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
  origin: (origin, c) => c.env.FRONTEND_URL,
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['POST', 'GET', 'OPTIONS', 'PUT', 'DELETE'],
  credentials: true,
}))

app.use('*', async (c, next) => {
  if (!c.env.BETTER_AUTH_SECRET) {
    console.error("Missing BETTER_AUTH_SECRET");
  }
  
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

app.on(['POST', 'GET'], '/api/auth/**', (c) => {
  const auth = c.get('auth');
  return auth.handler(c.req.raw);
})

/**
 * Endpoint for uploading profile pictures to R2.
 */
app.post('/api/upload-image', async (c) => {
  const auth = c.get('auth');
  const qc = c.get('queryClient');
  
  // Use TanStack Query to fetch/cache the session on the server
  const session = await qc.fetchQuery({
    queryKey: ['session', c.req.header('Authorization')],
    queryFn: () => auth.api.getSession({ headers: c.req.raw.headers }),
  });
  
  if (!session) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

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

export default app;