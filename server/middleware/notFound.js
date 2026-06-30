/**
 * Catches requests to undefined routes and forwards a 404 error
 * to the centralized error handler.
 */
function notFound(req, res, next) {
  const error = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
}

export default notFound;
