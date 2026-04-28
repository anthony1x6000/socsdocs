import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { drizzle } from 'drizzle-orm/d1'
import * as schema from './db/schema'

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
}

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>()

/**
 * CORS must be registered before the auth handler to handle preflight OPTIONS requests.
 * @see Hono. (2025). Better Auth on Cloudflare. Hono. https://hono.dev/examples/better-auth-on-cloudflare
 */
// Pass a function to `origin` to dynamically read from c.env safely
app.use('/api/*', cors({
  origin: (origin, c) => c.env.FRONTEND_URL,
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['POST', 'GET', 'OPTIONS', 'PUT', 'DELETE'],
  credentials: true,
}))

/**
 * Per-request initialization avoids SQLite WAL locks in local development.
 * @see Valentino, S. (2024). Better Auth + Cloudflare Workers: The integration guide nobody wrote. Medium. https://medium.com/@senioro.valentino/better-auth-cloudflare-workers-the-integration-guide-nobody-wrote-8480331d805f 
 */
app.use('*', async (c, next) => {
  if (!c.env.BETTER_AUTH_SECRET) {
    console.error("Missing BETTER_AUTH_SECRET");
  }
  
  const db = drizzle(c.env.socs_db, { schema });
  
  const auth = betterAuth({
    database: drizzleAdapter(db, {
      provider: "sqlite",
      schema: {
        // Explicitly mapping schema helps Drizzle resolve relations for joins
        user: schema.user,
        session: schema.session,
        account: schema.account,
        verification: schema.verification
      }
    }),
    experimental: {
      /**
       * Reduces DB round-trips by 2x-3x by using SQL joins for session validation.
       * @see Better Auth Contributors. (2024). Drizzle adapter. Better Auth. https://better-auth.com/docs/adapters/drizzle 
       */
      joins: true 
    },
    emailAndPassword: { enabled: true },
    plugins: [
      // Enables account management features like changing password/email
    ],
    secret: c.env.BETTER_AUTH_SECRET, 
    baseURL: c.env.BETTER_AUTH_URL,
    trustedOrigins: [c.env.FRONTEND_URL].filter(Boolean) as string[],
    advanced: {
      defaultBearerToken: true,
      useSecureCookies: c.env.NODE_ENV === "production",
      /**
       * Configures client IP detection for rate limiting and security auditing.
       * 'CF-Connecting-IP' is used in production (Cloudflare), while 'x-forwarded-for'
       * provides compatibility for local development environments.
       */
      ipAddress: {
        ipAddressHeaders: ["CF-Connecting-IP", "x-forwarded-for"],
      },
    }
  });

  c.set('auth', auth as ReturnType<typeof betterAuth>);
  await next();
})

app.on(['POST', 'GET'], '/api/auth/**', (c) => {
  const auth = c.get('auth');
  /**
   * Cloudflare D1 does not support traditional transactions; Better Auth
   * handles this via Drizzle's batch API internally.
   * @see Cloudflare. (2025). Cloudflare D1. Cloudflare Developers. https://developers.cloudflare.com/d1/
   */
  return auth.handler(c.req.raw);
})

/**
 * Endpoint for uploading profile pictures to R2.
 */
app.post('/api/upload-image', async (c) => {
  const auth = c.get('auth');
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  
  if (!session) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  const formData = await c.req.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return c.json({ error: 'No file uploaded' }, 400);
  }

  const key = `profile-pics/${session.user.id}-${Date.now()}-${file.name}`;
  await c.env.socs_r2.put(key, file.stream(), {
    httpMetadata: { contentType: file.type }
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