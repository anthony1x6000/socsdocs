# Edge Server Extensibility Guide

This guide explains how to extend the `edge-server` by adding new database tables and API endpoints.

## Database Schema (Drizzle ORM)

The database uses Drizzle ORM for Cloudflare D1 (SQLite).

### How to Add New Tables
1.  **Define the table**: In `src/db/schema.ts`, use `sqliteTable(name, columns)`.
2.  **Export the table**: Export the table constant so it can be used in migrations and queries.
3.  **Define relations (Optional)**: Use `relations(table, ({ one, many }) => ({ ... }))` to establish application-level joins.
4.  **Generate migration**: Run `pnpm run db:generate`.
5.  **Apply migration**: Run `pnpm run db:migrate`.

### Example: Messaging System
To add support for public boards and direct messages:

```ts
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { user } from "./schema";

export const conversations = sqliteTable("conversations", {
  id: text("id").primaryKey(),
  type: text("type").$type<"DM" | "Board">().notNull(),
  name: text("name"), // Optional for DMs, required for Boards
});

export const participants = sqliteTable("participants", {
  conversationId: text("conversationId").notNull().references(() => conversations.id),
  userId: text("userId").notNull().references(() => user.id),
});

export const messages = sqliteTable("messages", {
  id: text("id").primaryKey(),
  conversationId: text("conversationId").notNull().references(() => conversations.id),
  senderId: text("senderId").notNull().references(() => user.id),
  content: text("content").notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
});
```

---

## API Endpoints (Hono)

The server uses Hono for routing.

### How to Add New Endpoints
1.  **Define the route**: Use `app.get()`, `app.post()`, `app.put()`, or `app.delete()` in `src/index.tsx`.
2.  **Authenticate the user**: Retrieve the session using `c.get('auth').api.getSession()`.
3.  **Access the database**: Use `drizzle(c.env.socs_db, { schema })`.
4.  **Perform operations**: Use Drizzle's query builder (`db.select()`, `db.insert()`, etc.).

### Example: Updating a Message (PUT)
```ts
import { and, eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import * as schema from './db/schema';

app.put('/api/messages/:id', async (c) => {
  const db = drizzle(c.env.socs_db, { schema });
  const auth = c.get('auth');
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  
  if (!session) return c.json({ error: 'Unauthorized' }, 401);
  
  const messageId = c.req.param('id');
  const { content } = await c.req.json();
  
  // Update an existing message if the sender matches
  const result = await db.update(schema.messages)
    .set({ content })
    .where(
      and(
        eq(schema.messages.id, messageId),
        eq(schema.messages.senderId, session.user.id)
      )
    );
    
  return c.json({ success: true, updated: result.rowsAffected > 0 });
});
```

### File Uploads (R2)
To add more authenticated file upload types:
1.  Define a new path prefix (e.g., `documents/`).
2.  Validate the file type and size.
3.  Update the return URL format to match the serving route.

---

## Frontend (React)

### How to Add New User Fields
To add and manage new user fields (e.g., `bio`, `preferences`):
1.  **Database**: Add the column to the `user` table in `edge-server/src/db/schema.ts`.
2.  **API**: Ensure the server-side auth configuration allows these fields (see Better Auth documentation).
3.  **UI**: In `socsdocs-fe/src/pages/AccountPage.tsx`, add a new `Card` component with the corresponding input.
4.  **Action**: Use the `updateUser` hook from `authClient` to persist changes.

```tsx
const [bio, setBio] = useState('');
const handleUpdateBio = async () => {
  await updateUser({ bio });
};
```

---

## Resources
- [Hono Documentation](https://hono.dev)
- [Drizzle ORM Documentation](https://orm.drizzle.team)
- [Better Auth Documentation](https://better-auth.com)
