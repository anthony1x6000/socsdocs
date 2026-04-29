/**
 * The base URL for the backend API.
 * Defaults to localhost:8787 for development if VITE_PUBLIC_API_URL is not set.
 */
export const API_URL = import.meta.env.VITE_PUBLIC_API_URL || "http://localhost:8787";
