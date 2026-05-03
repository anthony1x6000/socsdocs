import { Hono } from 'hono'
import { drizzle } from 'drizzle-orm/d1'
import * as schema from '../db/schema'
import { authMiddleware } from '../middleware/auth'
import { Bindings, Variables } from '../types'

const chat = new Hono<{ Bindings: Bindings; Variables: Variables }>()

/**
 * Post to Chat.
 */
chat.post('/', authMiddleware, async (c) => {
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
 */
chat.get('/', authMiddleware, async (c) => {
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

export default chat;
