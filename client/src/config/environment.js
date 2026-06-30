/**
 * Centralized access to client-side environment variables.
 * Vite only exposes variables prefixed with VITE_.
 */
export const ENV = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  APP_NAME: import.meta.env.VITE_APP_NAME || 'ViceHub',
  MODE: import.meta.env.MODE,
};
