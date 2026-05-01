import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { drizzle } from 'drizzle-orm/d1'
import * as schema from './db/schema'
import { QueryClient } from '@tanstack/query-core'
import { Bindings, Variables } from './types'
import chatRoutes from './routes/chat'
import imageRoutes from './routes/images'

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
    return c.env.FRONTEND_URL;
  },
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['POST', 'GET', 'OPTIONS', 'PUT', 'DELETE'],
  credentials: true,
}))

app.use('*', async (c, next) => {
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

// Auth Handlers
app.on(['POST', 'GET'], '/api/auth/**', (c) => {
  const auth = c.get('auth');
  return auth.handler(c.req.raw);
})

// Feature Routes
app.route('/api/chat', chatRoutes)
app.route('/api', imageRoutes) // images routes already have /upload-image and /images/*

export default app;
