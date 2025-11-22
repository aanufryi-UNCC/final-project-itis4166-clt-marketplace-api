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

router.get('/categories', getAllCategoriesHandler);
router.get('/categories/:id', validateCategoryId, getCategoryHandler);
router.post('/categories', authenticate, authorizeModerator, validateCategory, createCategoryHandler);
router.patch('/categories/:id', authenticate, authorizeModerator, validateCategoryId, validateCategory, updateCategoryHandler);
router.delete('/categories/:id', authenticate, authorizeModerator, validateCategoryId, deleteCategoryHandler);

export default router;