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

router.get('/orders', authenticate, getOrdersHandler);
router.get('/orders/:id', authenticate, validateOrderId, getOrderHandler);
router.post('/orders', authenticate, validateCreateOrder, createOrderHandler);
router.patch('/orders/:id/status', authenticate, validateOrderId, validateStatusUpdate, updateOrderHandler);
router.delete('/orders/:id', authenticate, validateOrderId, deleteOrderHandler);

export default router;