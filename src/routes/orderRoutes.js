import express from 'express';
import { authenticate } from '../middleware/authenticate.js';
import {
  getOrdersHandler,
  getOrderHandler,
  createOrderHandler,
  updateOrderHandler,
  deleteOrderHandler
} from '../controllers/orderController.js';
import {
  validateOrderId,
  validateCreateOrder,
  validateStatusUpdate
} from '../middleware/orderValidators.js';

const router = express.Router();

router.get('/', authenticate, getOrdersHandler);
router.get('/:id', authenticate, validateOrderId, getOrderHandler);
router.post('/', authenticate, validateCreateOrder, createOrderHandler);
router.patch('/:id/status', authenticate, validateOrderId, validateStatusUpdate, updateOrderHandler);
router.delete('/:id', authenticate, validateOrderId, deleteOrderHandler);

export default router;