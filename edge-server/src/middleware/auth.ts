import { Context, Next } from 'hono'
import { Bindings, Variables } from '../types'

/**
 * Middleware to ensure the user is authenticated.
 */
export const authMiddleware = async (c: Context<{ Bindings: Bindings; Variables: Variables }>, next: Next) => {
  const auth = c.get('auth');
  const authHeader = c.req.header('Authorization');

  if (!authHeader) {
    return c.json({ error: 'Unauthorized: Missing Authorization header' }, 401);
  }

  try {
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
