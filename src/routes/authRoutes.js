import express from 'express';
import { signUpHandler, logInHandler, logOutHandler } from '../controllers/authController.js';

const router = express.Router();

// POST /auth/register
router.post('/register', signUpHandler);

// POST /auth/login
router.post('/login', logInHandler);

// POST /auth/logout
router.post('/logout', logOutHandler);

export default router;