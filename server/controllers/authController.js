import asyncHandler from '../utils/asyncHandler.js';
import {
  registerUser,
  loginUser,
  updateUserProfile,
  updateUserPassword,
} from '../services/authService.js';

/**
 * POST /api/auth/register
 * Creates a new account and returns the user plus a JWT.
 */
export const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const { user, token } = await registerUser({ username, email, password });

  res.status(201).json({
    success: true,
    message: 'Account created successfully.',
    data: { user, token },
  });
});

/**
 * POST /api/auth/login
 * Verifies credentials and returns the user plus a JWT.
 */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { user, token } = await loginUser({ email, password });

  res.status(200).json({
    success: true,
    message: 'Logged in successfully.',
    data: { user, token },
  });
});

/**
 * POST /api/auth/logout
 * Stateless JWT auth has no server-side session to invalidate;
 * the client is responsible for discarding the token. This endpoint
 * exists primarily so the client has a consistent API to call and so
 * future versions can blacklist tokens if needed.
 */
export const logout = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Logged out successfully.',
    data: {},
  });
});

/**
 * GET /api/auth/me
 * Returns the currently authenticated user. Requires the `protect`
 * middleware to have already attached req.user.
 */
export const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Current user retrieved successfully.',
    data: { user: req.user },
  });
});

/**
 * PUT /api/auth/profile
 * Updates the current user's username and/or email.
 */
export const updateProfile = asyncHandler(async (req, res) => {
  const { username, email } = req.body;
  const user = await updateUserProfile(req.user._id, { username, email });

  res.status(200).json({
    success: true,
    message: 'Profile updated successfully.',
    data: { user },
  });
});

/**
 * PUT /api/auth/password
 * Changes the current user's password after verifying the old one.
 */
export const updatePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  await updateUserPassword(req.user._id, currentPassword, newPassword);

  res.status(200).json({
    success: true,
    message: 'Password updated successfully.',
    data: {},
  });
});
