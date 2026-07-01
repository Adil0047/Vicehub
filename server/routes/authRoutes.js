import { Router } from 'express';
import {
  register,
  login,
  logout,
  getMe,
  updateProfile,
  updatePassword,
} from '../controllers/authController.js';
import {
  registerValidator,
  loginValidator,
  updateProfileValidator,
  updatePasswordValidator,
} from '../validators/authValidator.js';
import validate from '../middleware/validate.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.post('/register', registerValidator, validate, register);
router.post('/login', loginValidator, validate, login);
router.post('/logout', protect, logout);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfileValidator, validate, updateProfile);
router.put('/password', protect, updatePasswordValidator, validate, updatePassword);

export default router;
