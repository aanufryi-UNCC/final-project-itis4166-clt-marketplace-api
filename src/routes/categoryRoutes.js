import express from 'express';
import { authenticate} from '../middleware/authenticate.js';
import { authorizeModerator } from '../middleware/authorizeModerator.js';
import {
  getAllCategoriesHandler,
  getCategoryHandler,
  createCategoryHandler,
  updateCategoryHandler,
  deleteCategoryHandler
} from '../controllers/categoryController.js';
import {
  validateCategory,
  validateCategoryId
} from '../middleware/categoryValidators.js';

const router = express.Router();

router.get('/', getAllCategoriesHandler);
router.get('/:id', validateCategoryId, getCategoryHandler);
router.post('/', authenticate, authorizeModerator, validateCategory, createCategoryHandler);
router.patch('/:id', authenticate, authorizeModerator, validateCategoryId, validateCategory, updateCategoryHandler);
router.delete('/:id', authenticate, authorizeModerator, validateCategoryId, deleteCategoryHandler);

export default router;