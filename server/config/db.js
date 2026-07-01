import mongoose from 'mongoose';
import { env } from './env.js';

mongoose.set('strictQuery', true);

/**
 * Connects to MongoDB Atlas via Mongoose.
 * Called once at server startup. Exits the process on failure since
 * the API is non-functional without a database connection.
 */
export async function connectDB() {
  try {
    const conn = await mongoose.connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000, // fail fast on misconfiguration instead of hanging 30s
    });
    // eslint-disable-next-line no-console
    console.log(`MongoDB connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`MongoDB connection failed: ${error.message}`);
    process.exit(1);
  }
}

mongoose.connection.on('disconnected', () => {
  // eslint-disable-next-line no-console
  console.warn('MongoDB disconnected.');
});

export default connectDB;
