import dotenv from 'dotenv';

dotenv.config();

/**
 * Centralized, validated access to server environment variables.
 * Add new required variables here as later phases introduce them
 * (MONGODB_URI, JWT_SECRET, CLOUDINARY_* in Phase 2/4).
 */
export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 5000,
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
};

export const isProduction = env.NODE_ENV === 'production';
