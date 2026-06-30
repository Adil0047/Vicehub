import { isProduction } from '../config/env.js';

/**
 * Centralized error handler. Returns the standard error response shape
 * defined in 04_API_SPEC.md. Never leaks stack traces in production.
 */
function errorHandler(err, req, res, _next) {
  const statusCode = err.statusCode && err.statusCode >= 400 ? err.statusCode : 500;

  const response = {
    success: false,
    message: err.message || 'Server error.',
    errors: err.errors || [],
  };

  if (!isProduction) {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
}

export default errorHandler;
