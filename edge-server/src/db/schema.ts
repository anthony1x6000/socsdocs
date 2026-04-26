import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

/**
 * Stores basic profile information for a user.
 */
export const user = sqliteTable("user", {
	/** A unique identifier for the user. */
	id: text("id").primaryKey(),
	/** The user's display name. */
	name: text("name").notNull(),
	/** The user's email address. */
	email: text("email").notNull().unique(),
	/** Indicates whether the user has confirmed they own this email address. */
	emailVerified: integer("emailVerified", { mode: "boolean" }).notNull(),
	/** A URL pointing to the user's profile picture. */
	image: text("image"),
	/** The date and time when the user's account was created. */
	createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
	/** The date and time when the user's profile was last updated. */
	updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull()
});

/**
 * Stores active login sessions to keep users logged in without needing to repeatedly enter their password.
 */
export const session = sqliteTable("session", {
	/** A unique identifier for the session. */
	id: text("id").primaryKey(),
	/** The date and time when the session is no longer valid and the user will need to log in again. */
	expiresAt: integer("expiresAt", { mode: "timestamp" }).notNull(),
	/** The IP address from where the user logged in. */
	ipAddress: text("ipAddress"),
	/** Information about the device and browser used to log in. */
	userAgent: text("userAgent"),
	/** The user this session belongs to. */
	userId: text("userId").notNull().references(() => user.id)
});

/**
 * Links a user's profile to a third-party login service, like Google or GitHub.
 */
export const account = sqliteTable("account", {
	/** A unique identifier for this linked account. */
	id: text("id").primaryKey(),
	/** The user's unique ID from the third-party service. */
	accountId: text("accountId").notNull(),
	/** The name of the third-party service (e.g., 'google' or 'github'). */
	providerId: text("providerId").notNull(),
	/** The user this linked account belongs to. */
	userId: text("userId").notNull().references(() => user.id),
	/** A temporary token used to request information from the third-party service. */
	accessToken: text("accessToken"),
	/** A token used to get a new access token without asking the user to log in again. */
	refreshToken: text("refreshToken"),
	/** Proof of identity provided by the third-party service. */
	idToken: text("idToken"),
	/** When the access token expires. */
	expiresAt: integer("expiresAt", { mode: "timestamp" }),
	/** The user's encrypted password, used if they log in directly instead of using a third-party service. */
	password: text("password")
});

/**
 * Stores temporary verification codes, such as those sent for password resets or email confirmation.
 */
export const verification = sqliteTable("verification", {
	/** A unique identifier for the verification request. */
	id: text("id").primaryKey(),
	/** The email address or phone number the code was sent to. */
	identifier: text("identifier").notNull(),
	/** The actual verification code. */
	value: text("value").notNull(),
	/** The date and time when the verification code is no longer valid. */
	expiresAt: integer("expiresAt", { mode: "timestamp" }).notNull()
});