import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

/**
 * Signs a JWT carrying the user's id and role.
 * Role is included so the auth middleware can authorize admin-only
 * routes without an extra database lookup on every request.
 */
export function generateToken(userId, role) {
  return jwt.sign({ id: userId, role }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });
}

export default generateToken;
