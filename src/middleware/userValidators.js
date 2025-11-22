import { param, body } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';
import { findUserByEmail } from '../repositories/userRepo.js';

export const validateUserId = [
  param('id').isInt({ min: 1 }).withMessage('User ID must be a positive integer'),
  handleValidationErrors,
];

export const validateSignUp = [
  body('username')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Username is required')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required')
    .bail()
    .custom(async (email) => {
      const exists = await findUserByEmail(email);
      if (exists) throw new Error('Email already in use');
      return true;
    }),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  handleValidationErrors,
];

export const validateLogIn = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
  handleValidationErrors,
];

export const validateRoleChange = [
  body('role')
    .isIn(['USER', 'MODERATOR'])
    .withMessage('Role must be USER or MODERATOR'),
  handleValidationErrors,
];