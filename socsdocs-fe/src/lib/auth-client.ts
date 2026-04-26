/**
 * @file socsdocs-fe/src/lib/auth-client.ts
 * @description Authentication client instance for managing edge server communication.
 * * @see Better Auth. (n.d.). Client instance. Better Auth Documentation. 
 * https://better-auth.com/docs/concepts/client
 * @see Better Auth. (n.d.). React integration. Better Auth Documentation. 
 * https://better-auth.com/docs/integrations/react
 */
import { createAuthClient } from "better-auth/react";

/**
 * Initializes the Better Auth client for the React environment.
 * The baseURL must point to the endpoint where the Better Auth handler is mounted.
 * * @type {import("better-auth/react").AuthClient}
 */
export const authClient = createAuthClient({
    /**
     * The baseURL identifies the authentication server. 
     * In local development, this defaults to the Wrangler port (8787).
     * @see https://better-auth.com/docs/concepts/client#create-client-instance
     */
    baseURL: import.meta.env.VITE_PUBLIC_API_URL || "http://localhost:8787"
});

/**
 * Destructured hooks and methods for programmatic authentication.
 * useSession provides reactive access to the current user state.
 * @see https://better-auth.com/docs/basic-usage#use-session
 */
export const { signIn, signUp, useSession } = authClient;