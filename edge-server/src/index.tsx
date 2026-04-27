import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { drizzle } from 'drizzle-orm/d1'
import * as schema from './db/schema'

type Bindings = {
  socs_db: D1Database
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
app.use('/api/auth/*', cors({
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
    secret: c.env.BETTER_AUTH_SECRET, 
    baseURL: c.env.BETTER_AUTH_URL,
    trustedOrigins: [c.env.FRONTEND_URL].filter(Boolean) as string[],
    advanced: {
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

export default app;