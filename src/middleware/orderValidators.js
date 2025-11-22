import { param, body } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateOrderId = [
  param('id').isInt({ min: 1 }).withMessage('Order ID must be a positive integer'),
  handleValidationErrors,
];

export const validateCreateOrder = [
  body('itemId').isInt({ min: 1 }).withMessage('Item ID must be a positive integer'),
  body('buyerId').isInt({ min: 1 }).withMessage('Buyer ID must be a positive integer'),
  body('sellerId').isInt({ min: 1 }).withMessage('Seller ID must be a positive integer'),
  body('quantity')
    .isInt({ min: 1 })
    .withMessage('Quantity must be at least 1'),
  body('totalPrice')
    .isInt({ min: 1 })
    .withMessage('Total price must be a positive integer (cents)'),
  body('paymentMethod')
    .trim()
    .notEmpty()
    .withMessage('Payment method is required'),
  handleValidationErrors,
];

export const validateStatusUpdate = [
  body('status')
    .isIn(['PENDING', 'SHIPPED', 'COMPLETED', 'CANCELLED'])
    .withMessage('Invalid order status'),
  handleValidationErrors,
];