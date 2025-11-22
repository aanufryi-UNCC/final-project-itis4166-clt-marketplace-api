import express from 'express';
import { authenticate } from '../middleware/authenticate.js';
import {
  getReviewsByItemHandler,
  getReviewsByUsernameHandler,
  createReviewHandler,
  updateReviewHandler,
  deleteReviewHandler
} from '../controllers/reviewController.js';
import {
  validateReviewId,
  validateCreateReview,
  validateUpdateReview
} from '../middleware/reviewValidators.js';

const router = express.Router();

//public
router.get('/item/:itemId',           getReviewsByItemHandler);
router.get('/user/:username',         getReviewsByUsernameHandler);

//authenicated users
router.post('/', authenticate, validateCreateReview, createReviewHandler);
router.patch('/:id', authenticate, validateReviewId, validateUpdateReview, updateReviewHandler);
router.delete('/:id', authenticate, validateReviewId, deleteReviewHandler);

export default router;