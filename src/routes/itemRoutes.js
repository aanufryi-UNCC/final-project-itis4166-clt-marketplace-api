import express from 'express';
import { authenticate } from '../middleware/authenticate.js';
import {
  getItemsHandler,
  getItemHandler,
  createItemHandler,
  updateItemHandler,
  deleteItemHandler,
  getItemReviewsHandler
} from '../controllers/itemController.js';
import {
  validateItemId,
  validateCreateItem,
  validateUpdateItem
} from '../middleware/itemValidators.js';

const router = express.Router();

//public
router.get('/',                getItemsHandler);
router.get('/:id',             validateItemId, getItemHandler);
router.get('/:id/reviews',     validateItemId, getItemReviewsHandler);
//authenticated users
router.post('/',               authenticate, validateCreateItem, createItemHandler);
router.put('/:id',             authenticate, validateItemId, validateUpdateItem, updateItemHandler);
router.delete('/:id',          authenticate, validateItemId, deleteItemHandler);

export default router;