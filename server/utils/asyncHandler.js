/**
 * Wraps an async route handler so thrown errors and rejected promises
 * are forwarded to next(), instead of needing a try/catch in every
 * controller. Keeps controllers thin per the master prompt's backend rules.
 */
function asyncHandler(fn) {
  return function wrappedHandler(req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

export default asyncHandler;
