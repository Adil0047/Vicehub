import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const DEFAULT_AVATAR =
  'https://res.cloudinary.com/vicehub/image/upload/v1/defaults/default-avatar.png';

/**
 * User schema — matches 03_DATABASE_SCHEMA.md exactly.
 * Schema definition only; business logic (registration, login flows)
 * lives in controllers/services, per the Mongoose Standards section
 * of the schema document.
 */
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required.'],
      unique: true,
      trim: true,
      minlength: [3, 'Username must be at least 3 characters.'],
      maxlength: [30, 'Username cannot exceed 30 characters.'],
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address.'],
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
      minlength: [8, 'Password must be at least 8 characters.'],
      select: false, // never returned by default in queries
    },
    avatar: {
      type: String,
      default: DEFAULT_AVATAR,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Favorite',
      },
    ],
  },
  { timestamps: true }
);

// email and username already get unique indexes from `unique: true` above.
// Explicit schema.index() is reserved for compound/advanced indexes as
// this model grows (e.g. { role: 1, createdAt: -1 } for admin queries).

/**
 * Hash the password before saving, but only if it was modified
 * (avoids re-hashing an already-hashed password on unrelated updates).
 */
userSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) {
    next();
    return;
  }

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

/**
 * Compares a plaintext password against this user's stored hash.
 * `this.password` is only available when the query explicitly used
 * `.select('+password')`, since the field is excluded by default.
 */
userSchema.methods.comparePassword = async function comparePassword(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

/**
 * Strips sensitive fields when a user document is serialized to JSON
 * (e.g. in API responses), so the password hash never leaks even if
 * a query accidentally selected it.
 */
userSchema.methods.toJSON = function toSafeJSON() {
  const user = this.toObject();
  delete user.password;
  delete user.__v;
  return user;
};

const User = mongoose.model('User', userSchema);

export default User;
