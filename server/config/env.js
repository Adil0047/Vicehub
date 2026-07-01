import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Loads the environment file matching NODE_ENV:
 *   NODE_ENV=production  -> .env.production
 *   anything else         -> .env.development
 *
 * Falls back to a plain .env if the env-specific file isn't present
 * (e.g. some hosting platforms inject variables directly and no
 * .env file exists on disk at all, which is fine — dotenv simply
 * no-ops if the file is missing).
 */
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';

dotenv.config({ path: path.resolve(__dirname, '..', envFile) });
dotenv.config(); // fallback to plain .env / already-injected platform vars

/**
 * Centralized, validated access to server environment variables.
 * Required variables are checked at startup so misconfiguration fails
 * fast and loudly instead of producing confusing runtime errors later.
 */
export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 5000,
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
};

export const isProduction = env.NODE_ENV === 'production';

const REQUIRED_VARS = ['MONGODB_URI', 'JWT_SECRET'];

/**
 * Validates that all required environment variables are present.
 * Called once at server startup. Throws immediately with a clear
 * message rather than letting the app boot into a broken state.
 */
export function validateEnv() {
  const missing = REQUIRED_VARS.filter((key) => !env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variable(s): ${missing.join(', ')}. ` +
        `Check your .env.development or .env.production file against .env.example.`
    );
  }
}
