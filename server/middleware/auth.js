import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import User from '../models/User.js';
import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';

/**
 * Protects a route by requiring a valid JWT in the Authorization header
 * (format: "Bearer <token>"). On success, attaches the authenticated
 * user document (without the password hash) to req.user.
 */
export const protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new ApiError('Not authorized. No token provided.', 401);
  }

  const token = authHeader.split(' ')[1];

  let decoded;
  try {
    decoded = jwt.verify(token, env.JWT_SECRET);
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new ApiError('Session expired. Please log in again.', 401);
    }
    throw new ApiError('Not authorized. Invalid token.', 401);
  }

  const user = await User.findById(decoded.id);

  if (!user) {
    throw new ApiError('Not authorized. User no longer exists.', 401);
  }

  req.user = user;
  next();
});

/**
 * Restricts a route to admin-role users only.
 * Must be used after `protect`, since it relies on req.user.
 */
export function adminOnly(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    next(new ApiError('Access denied. Admins only.', 403));
    return;
  }
  next();
}
