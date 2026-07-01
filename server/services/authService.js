import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import ApiError from '../utils/ApiError.js';

/**
 * Creates a new user account. Throws a 409 if the email or username
 * is already taken. Returns the created user plus a signed JWT.
 */
export async function registerUser({ username, email, password }) {
  const existing = await User.findOne({ $or: [{ email }, { username }] });

  if (existing) {
    const field = existing.email === email ? 'email' : 'username';
    throw new ApiError(`An account with that ${field} already exists.`, 409);
  }

  const user = await User.create({ username, email, password });
  const token = generateToken(user._id, user.role);

  return { user, token };
}

/**
 * Verifies credentials and returns the user plus a signed JWT.
 * Throws a generic 401 for both "no such user" and "wrong password"
 * so the API never reveals which part of the credential pair was wrong.
 */
export async function loginUser({ email, password }) {
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new ApiError('Invalid email or password.', 401);
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new ApiError('Invalid email or password.', 401);
  }

  const token = generateToken(user._id, user.role);

  return { user, token };
}

/**
 * Updates the editable fields of a user's profile.
 * Throws a 409 if the new username/email collides with another account.
 */
export async function updateUserProfile(userId, updates) {
  const { username, email } = updates;

  if (username || email) {
    const conflict = await User.findOne({
      _id: { $ne: userId },
      $or: [...(username ? [{ username }] : []), ...(email ? [{ email }] : [])],
    });

    if (conflict) {
      const field = conflict.email === email ? 'email' : 'username';
      throw new ApiError(`An account with that ${field} already exists.`, 409);
    }
  }

  const user = await User.findByIdAndUpdate(
    userId,
    { ...(username && { username }), ...(email && { email }) },
    { new: true, runValidators: true }
  );

  if (!user) {
    throw new ApiError('User not found.', 404);
  }

  return user;
}

/**
 * Verifies the current password, then sets a new one.
 * Password hashing happens automatically via the pre-save hook on User.
 */
export async function updateUserPassword(userId, currentPassword, newPassword) {
  const user = await User.findById(userId).select('+password');

  if (!user) {
    throw new ApiError('User not found.', 404);
  }

  const isMatch = await user.comparePassword(currentPassword);

  if (!isMatch) {
    throw new ApiError('Current password is incorrect.', 401);
  }

  user.password = newPassword;
  await user.save();

  return user;
}
