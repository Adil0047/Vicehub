import NotImplementedError from '../utils/NotImplementedError.js';

/**
 * STUB MODULE — Phase 2 deliverable.
 *
 * This will establish the MongoDB Atlas connection via Mongoose once
 * Phase 2 (Authentication) begins, per 03_DATABASE_SCHEMA.md.
 *
 * Real implementation will:
 *   - import mongoose
 *   - read MONGODB_URI from config/env.js
 *   - connect with mongoose.connect(uri)
 *   - log connection success/failure
 *   - export the connect function for use in server.js
 *
 * The export below is intentionally non-functional. Calling it throws
 * a clear, typed error rather than silently failing or faking a
 * successful connection — server.js must NOT call this until Phase 2
 * adds mongoose as a dependency.
 */
export async function connectDB() {
  throw new NotImplementedError('Database connection (MongoDB Atlas)', 2);
}

export default connectDB;
