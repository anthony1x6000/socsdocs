import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { user } from "./auth";

export const chatMessages = sqliteTable("chat_messages", {
    id: text("id").primaryKey(),
    content: text("content").notNull(),
    senderId: text("senderId").notNull().references(() => user.id),
    date: integer("date", { mode: "timestamp" }).notNull()
});  

/**
 * Defines the relational mapping for the `chatMessages` table.
 */
export const chatMessagesRelations = relations(chatMessages, ({ one }) => ({
    /** Defines a one-to-one relationship linking a chat message to the user who sent it. */
    sender: one(user, {
        fields: [chatMessages.senderId],
        references: [user.id],
    }),
}));
