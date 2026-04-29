import { createAuthClient } from "better-auth/react";
import { createAuthQueryClient } from "better-auth-react-query";
import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../config/protectedExports";

/**
 * Initializes the Better Auth client for the React environment.
 * The baseURL must point to the endpoint where the Better Auth handler is mounted.
 * @type {import("better-auth/react").AuthClient}
 */
export const authClient = createAuthClient({
    /**
     * The baseURL identifies the authentication server. 
     * In local development, this defaults to the Wrangler port (8787).
     * @see https://better-auth.com/docs/concepts/client#create-client-instance
     */
    baseURL: API_URL,
    plugins: [
    ]
});

export const auth = createAuthQueryClient(authClient);

/**
 * A TanStack Query-based hook for accessing the current session.
 */
export const useSession = () => useQuery(auth.getSession.queryOptions({}));

// Re-export other methods
export const { signIn, signUp, changeEmail, changePassword, updateUser } = authClient;
