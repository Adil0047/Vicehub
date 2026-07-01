import { body } from 'express-validator';

/**
 * Validation chains for authentication endpoints. Each export is an
 * array of express-validator middleware, run before the controller
 * via the shared `validate` middleware (middleware/validate.js).
 */

export const registerValidator = [
  body('username')
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters.'),
  body('email').trim().isEmail().withMessage('Please provide a valid email address.').normalizeEmail(),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters.')
    .matches(/\d/)
    .withMessage('Password must contain at least one number.'),
];

export const loginValidator = [
  body('email').trim().isEmail().withMessage('Please provide a valid email address.').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required.'),
];

export const updateProfileValidator = [
  body('username')
    .optional()
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters.'),
  body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address.')
    .normalizeEmail(),
];

export const updatePasswordValidator = [
  body('currentPassword').notEmpty().withMessage('Current password is required.'),
  body('newPassword')
    .isLength({ min: 8 })
    .withMessage('New password must be at least 8 characters.')
    .matches(/\d/)
    .withMessage('New password must contain at least one number.'),
];
