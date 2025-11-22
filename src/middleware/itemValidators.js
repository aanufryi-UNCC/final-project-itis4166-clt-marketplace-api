import { param, body } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateItemId = [
  param('id').isInt({ min: 1 }).withMessage('Item ID must be a positive integer'),
  handleValidationErrors,
];

export const validateCreateItem = [
  body('name')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Item name is required')
    .bail()
    .isLength({ min: 2 })
    .withMessage('Item name must be at least 2 characters'),
  body('description')
    .optional({ checkFalsy: true })
    .trim()
    .escape()
    .isLength({ max: 1000 })
    .withMessage('Description max 1000 characters'),
  body('price')
    .isInt({ min: 1 })
    .withMessage('Price must be a positive integer'),
  body('categoryId')
    .isInt({ min: 1 })
    .withMessage('Category ID must be a positive integer'),
  body('sellerId')
    .isInt({ min: 1 })
    .withMessage('Seller ID must be a positive integer'),
  handleValidationErrors,
];

export const validateUpdateItem = [
  body('name')
    .optional()
    .trim()
    .escape()
    .isLength({ min: 2 })
    .withMessage('Item name must be at least 2 characters'),
  body('description')
    .optional({ checkFalsy: true })
    .trim()
    .escape()
    .isLength({ max: 1000 }),
  body('price')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Price must be a positive integer'),
  handleValidationErrors,
];