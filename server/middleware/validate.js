import { validationResult } from 'express-validator';
import ApiError from '../utils/ApiError.js';

/**
 * Runs after a route's express-validator chain. Collects any
 * validation failures and forwards a single 422 ApiError in the
 * standard response shape, instead of letting the controller run
 * with bad input.
 */
function validate(req, res, next) {
  const result = validationResult(req);

  if (result.isEmpty()) {
    next();
    return;
  }

  const errors = result.array().map((err) => ({
    field: err.path,
    message: err.msg,
  }));

  next(new ApiError('Validation failed.', 422, errors));
}

export default validate;
