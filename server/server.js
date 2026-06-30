import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { env, isProduction } from './config/env.js';
import healthRoutes from './routes/healthRoutes.js';
import notFound from './middleware/notFound.js';
import errorHandler from './middleware/errorHandler.js';

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

// 404 + centralized error handling (must be registered last)
app.use(notFound);
app.use(errorHandler);

app.listen(env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`ViceHub API running on port ${env.PORT} [${env.NODE_ENV}]`);
});

export default app;
