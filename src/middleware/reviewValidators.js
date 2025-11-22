import { param, body } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateReviewId = [
  param('id').isInt({ min: 1 }).withMessage('Review ID must be a positive integer'),
  handleValidationErrors,
];

export const validateCreateReview = [
  body('rating')
    .isIn(['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE'])
    .withMessage('Rating must be 1-5 stars'),
  body('comment')
    .optional({ checkFalsy: true })
    .trim()
    .escape()
    .isLength({ max: 1000 })
    .withMessage('Review comment should be at most 1000 characters'),
  body('itemId')
    .isInt({ min: 1 })
    .withMessage('Item ID must be a positive integer'),
  body('reviewerId')
    .isInt({ min: 1 })
    .withMessage('Reviewer ID must be a positive integer'),
  handleValidationErrors,
];

export const validateUpdateReview = [
  body('rating')
    .optional()
    .isIn(['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE'])
    .withMessage('Rating must be 1-5 stars'),
  body('comment')
    .optional({ checkFalsy: true })
    .trim()
    .escape()
    .isLength({ max: 1000 }),
  handleValidationErrors,
];