import express from 'express';
import { signUpHandler, logInHandler, logOutHandler } from '../controllers/authController.js';
import { validateSignUp, validateLogIn } from '../middleware/userValidators.js';

const router = express.Router();

// POST /auth/register
router.post('/register', validateSignUp, signUpHandler);

// POST /auth/login
router.post('/login', validateLogIn, logInHandler);

// POST /auth/logout
router.post('/logout', logOutHandler);

export default router;