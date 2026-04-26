import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

/**
 * The user table serves as the primary entity for identity management.
 * In a distributed SQLite environment, the primary key is defined as a text string, 
 * typically a ULID or UUID, to prevent collision risks and ensure sortable 
 * uniqueness across edge nodes (Drizzle Team, 2024).
 * 
 * @see Better Auth Contributors. (2024). User model specifications. 
 * Better Auth Documentation. https://better-auth.com
 */
export const user = sqliteTable("user", {
    /** 
     * A unique identifier for the user. Text is preferred over auto-incrementing 
     * integers to facilitate client-side ID generation and synchronization 
     * in distributed systems (Drizzle Team, 2024).
     */
    id: text("id").primaryKey(),
    /** 
     * The user's display name. Stored as text to accommodate various 
     * character sets and lengths (Drizzle Team, 2024). 
     */
    name: text("name").notNull(),
    /** 
     * The user's email address. The unique constraint is enforced at the 
     * database level to prevent duplicate account creation (Drizzle Team, 2024).
     */
    email: text("email").notNull().unique(),
    /** 
     * Indicates whether the user has confirmed ownership of the email. 
     * SQLite stores booleans as integers (0 or 1), which Drizzle ORM maps 
     * automatically (Cloudflare, 2025a).
     */
    emailVerified: integer("emailVerified", { mode: "boolean" }).notNull(),
    /** A URL pointing to the user's profile picture. */
    image: text("image"),
    /** 
     * The timestamp of account creation. Using integer mode: "timestamp" 
     * ensures the Date object is serialized to a Unix timestamp, which is 
     * more efficient for SQLite indexing than ISO strings (Cloudflare, 2025a).
     */
    createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
    /** The timestamp of the last profile update. */
    updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull()
});

/**
 * The session table manages stateful user interactions in a stateless environment.
 * In Cloudflare Workers, session persistence relies on the database rather than 
 * in-memory stores due to the ephemeral nature of isolates (Cloudflare, 2025b).
 * 
 * @see Cloudflare. (2025b). Cloudflare Workers documentation. 
 * https://developers.cloudflare.com/workers
 */
export const session = sqliteTable("session", {
    /** Unique session identifier. */
    id: text("id").primaryKey(),
    /** 
     * Expiration timestamp. Better Auth utilizes this to perform 
     * server-side session invalidation (Better Auth Contributors, 2024).
     */
    expiresAt: integer("expiresAt", { mode: "timestamp" }).notNull(),
    /** 
     * The IP address associated with the login, useful for security 
     * auditing and geo-fencing (Better Auth Contributors, 2024).
     */
    ipAddress: text("ipAddress"),
    /** Information regarding the client browser and operating system. */
    userAgent: text("userAgent"),
    /** 
     * Foreign key link to the user. Cascading deletes should be managed 
     * by the application logic to ensure data consistency in D1 
     * (Cloudflare, 2025a).
     */
    userId: text("userId").notNull().references(() => user.id)
});

/**
 * The account table facilitates OAuth 2.0 and OpenID Connect provider linking.
 * This structure allows a single user to maintain multiple identity 
 * providers (Google, GitHub) linked to one profile (IETF, 2012).
 * 
 * @see Internet Engineering Task Force. (2012). The OAuth 2.0 Authorization 
 * Framework (RFC 6749). https://datatracker.ietf.org/doc/html/rfc6749
 */
export const account = sqliteTable("account", {
    /** Unique account linkage identifier. */
    id: text("id").primaryKey(),
    /** The unique ID provided by the external OIDC/OAuth provider. */
    accountId: text("accountId").notNull(),
    /** The name of the provider (e.g., 'google', 'github'). */
    providerId: text("providerId").notNull(),
    /** Link to the internal user profile. */
    userId: text("userId").notNull().references(() => user.id),
    /** 
     * Short-lived access token for third-party API interactions. 
     * Note: Should be encrypted if stored long-term (OWASP, 2023).
     */
    accessToken: text("accessToken"),
    /** Token used to refresh the access token without user re-intervention. */
    refreshToken: text("refreshToken"),
    /** JWT containing verified user identity information from the provider. */
    idToken: text("idToken"),
    /** Access token expiration timestamp. */
    expiresAt: integer("expiresAt", { mode: "timestamp" }),
    /** 
     * Encrypted password hash. This is only populated for 
     * email/password credentials (OWASP, 2023).
     */
    password: text("password")
});

/**
 * The verification table handles short-lived codes for security-critical 
 * flows such as password resets or multi-factor authentication (OWASP, 2023).
 * 
 * @see OWASP Foundation. (2023). Authentication Cheat Sheet. 
 * https://cheatsheetseries.owasp.org
 */
export const verification = sqliteTable("verification", {
    /** Unique identifier for the verification request. */
    id: text("id").primaryKey(),
    /** The target of verification (email address or phone number). */
    identifier: text("identifier").notNull(),
    /** 
     * The sensitive verification code. In production, this should be 
     * hashed before storage (OWASP, 2023).
     */
    value: text("value").notNull(),
    /** 
     * Expiration window. Verification codes are typically valid for 
     * 5-15 minutes (Better Auth Contributors, 2024).
     */
    expiresAt: integer("expiresAt", { mode: "timestamp" }).notNull()
});