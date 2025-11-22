import express from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { authorizeModerator } from '../middleware/authorizeModerator.js';
import {
  getUserHandler,
  updateUserHandler,
  deleteUserHandler
} from '../controllers/userController.js';
import {
  validateUserId,
  validateRoleChange
} from '../middleware/userValidators.js';

const router = express.Router();

//public
router.get('/users/:id', validateUserId, getUserHandler);

// owner and mod
router.patch('/users/:id', authenticate, validateUserId, updateUserHandler);
router.delete('/users/:id', authenticate, validateUserId, deleteUserHandler);

//mod only
router.patch('/users/:id/role', authenticate, authorizeModerator, validateUserId, validateRoleChange, updateUserHandler);

export default router;