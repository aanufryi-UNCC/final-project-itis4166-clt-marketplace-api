import { param, body } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';
import { findCategoryByName } from '../repositories/categoryRepo.js';

export const validateCategoryId = [
  param('id').isInt({ min: 1 }).withMessage('Category ID must be a positive integer'),
  handleValidationErrors,
];

export const validateCategory = [
  body('name')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Category name is required')
    .bail()
    .isLength({ min: 2 })
    .withMessage('Category name must be at least 2 characters')
    .bail()
    .custom(async (value) => {
      const exists = await findCategoryByName(value);
      if (exists) throw new Error('Category name must be unique');
      return true;
    }),
  handleValidationErrors,
];