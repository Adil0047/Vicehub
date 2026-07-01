const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;

/**
 * Client-side form validation helpers. These mirror the server-side
 * express-validator rules (validators/authValidator.js) so users get
 * instant feedback, but the server remains the source of truth —
 * every rule here is re-checked on the backend regardless.
 */

export function validateUsername(value) {
  if (!value || value.trim().length === 0) return 'Username is required.';
  if (value.trim().length < 3) return 'Username must be at least 3 characters.';
  if (value.trim().length > 30) return 'Username cannot exceed 30 characters.';
  return null;
}

export function validateEmail(value) {
  if (!value || value.trim().length === 0) return 'Email is required.';
  if (!EMAIL_PATTERN.test(value.trim())) return 'Please provide a valid email address.';
  return null;
}

export function validatePassword(value) {
  if (!value) return 'Password is required.';
  if (value.length < 8) return 'Password must be at least 8 characters.';
  if (!/\d/.test(value)) return 'Password must contain at least one number.';
  return null;
}

export function validateRequired(value, fieldLabel = 'This field') {
  if (!value || value.trim().length === 0) return `${fieldLabel} is required.`;
  return null;
}
