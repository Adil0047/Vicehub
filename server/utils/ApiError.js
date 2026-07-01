/**
 * Standard application error carrying an HTTP status code.
 * Thrown from services/controllers and caught by errorHandler.js,
 * which maps it directly onto the standard API error response shape
 * defined in 04_API_SPEC.md.
 */
class ApiError extends Error {
  constructor(message, statusCode = 500, errors = []) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

export default ApiError;
