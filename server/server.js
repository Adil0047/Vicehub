import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { env, isProduction, validateEnv } from './config/env.js';
import { connectDB } from './config/db.js';
import healthRoutes from './routes/healthRoutes.js';
import authRoutes from './routes/authRoutes.js';
import notFound from './middleware/notFound.js';
import errorHandler from './middleware/errorHandler.js';

validateEnv();

const app = express();

// Security & parsing middleware
app.use(helmet());
app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging (skip noisy logs in production)
if (!isProduction) {
  app.use(morgan('dev'));
}

// Routes
app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);

// 404 + centralized error handling (must be registered last)
app.use(notFound);
app.use(errorHandler);

async function start() {
  await connectDB();

  app.listen(env.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`ViceHub API running on port ${env.PORT} [${env.NODE_ENV}]`);
  });
}

start();

export default app;
