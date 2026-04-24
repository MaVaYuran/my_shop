import { Router } from 'express';
import { register, login, logout, getMe } from '../controller/AuthController.js';
import { authenticate } from '../middlewares/auth.js';

const router = Router();
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', authenticate, getMe);
// router.get('/users', access)

export default router;
