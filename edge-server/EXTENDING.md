# socsdocs Extensibility Guide

Ship new features (chat, uploads, bios, binaries) fast. Uses Hono, Drizzle, Better Auth, and TanStack.

---

## 1. Database Layer (Drizzle ORM)

Located in `edge-server/src/db/schema.ts`. Uses SQLite for Cloudflare D1.

### Step 1: Define Table
Add new tables using `sqliteTable`. Use ULID/UUID strings for IDs to avoid collisions at the edge.

```ts
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { user } from "./schema";

export const chatMessages = sqliteTable("chat_messages", {
  id: text("id").primaryKey(),
  content: text("content").notNull(),
  senderId: text("senderId").notNull().references(() => user.id),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
});
```

### Step 2: Define Relations
Enable high-performance joins (2-3x speedup) by defining `relations`.

```ts
import { relations } from "drizzle-orm";

export const chatMessageRelations = relations(chatMessages, ({ one }) => ({
  sender: one(user, {
    fields: [chatMessages.senderId],
    references: [user.id],
  }),
}));
```

### Step 3: Migration
1. `pnpm run db:generate` (creates SQL in `drizzle/`)
2. `pnpm run db:migrate` (applies to local/remote D1)

---

## 2. API Layer (Hono)

Located in `edge-server/src/index.tsx`.

### Authenticated Routes
Use `c.get('auth')` for Better Auth and the server-side `queryClient` for session caching.

```ts
app.post('/api/chat', async (c) => {
  const auth = c.get('auth');
  const qc = c.get('queryClient');
  const db = drizzle(c.env.socs_db, { schema });

  // High-perf session fetch
  const session = await qc.fetchQuery({
    queryKey: ['session', c.req.header('Authorization')],
    queryFn: () => auth.api.getSession({ headers: c.req.raw.headers }),
  });

  if (!session) return c.json({ error: 'Unauthorized' }, 401);

  const { content } = await c.req.json();
  const newMessage = await db.insert(schema.chatMessages).values({
    id: crypto.randomUUID(),
    content,
    senderId: session.user.id,
    createdAt: new Date(),
  }).returning();

  return c.json(newMessage[0]);
});
```

---

## 3. Frontend Layer (React + TanStack)

### TanStack Router (Adding Pages)
Create a new file in `socsdocs-fe/src/routes/`. Example: `chat.tsx`.

```tsx
import { createFileRoute } from '@tanstack/react-router';
import { useChatMessages } from '../hooks/useChat';

export const Route = createFileRoute('/chat')({
  component: ChatPage,
});

function ChatPage() {
  const { data: messages, isLoading } = useChatMessages();
  // ... render UI
}
```
*Note: Run `pnpm dev` to auto-generate `routeTree.gen.ts`.*

### TanStack Query (Data Fetching)
Use `useQuery` for GET and `useMutation` for POST/PUT.

```tsx
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useChatMessages = () => {
  return useQuery({
    queryKey: ['chat-messages'],
    queryFn: () => fetch('/api/chat').then(res => res.json()),
  });
};

export const useSendMessage = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (content: string) => 
      fetch('/api/chat', { 
        method: 'POST', 
        body: JSON.stringify({ content }) 
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['chat-messages'] }),
  });
};
```

---

## 4. Feature Recipes

### Bio / Profile Extension
1. **DB**: Add `bio: text("bio")` to `user` table in `schema.ts`.
2. **FE**: Use `authClient.updateUser({ bio: "Hello world" })`. No custom API needed for basic user fields.

### File / Binary Uploads (R2)
1. **API**: Use the `/api/upload-image` pattern. Stream `c.req.formData()` directly to `c.env.socs_r2.put()`.
2. **FE**: Use `ExternFileUpload.tsx` component. It handles the `FormData` and progress state.

### Code / Text Snippets
1. **DB**: Table with `content: text("content")` and `language: text("language")`.
2. **FE**: Use TanStack Router's `loader` to pre-fetch large text blobs before the page renders.

---

## Resources
- [Hono Docs](https://hono.dev)
- [TanStack Query Docs](https://tanstack.com/query/latest)
- [Better Auth Docs](https://better-auth.com)
- [Drizzle ORM Docs](https://orm.drizzle.team)
