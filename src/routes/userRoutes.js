import express from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { authorizeModerator } from '../middleware/authorizeModerator.js';
import {
  getUserHandler,
  updateUserHandler,
  deleteUserHandler,
  changeUserRoleHandler
} from '../controllers/userController.js';
import {
  validateUserId,
  validateRoleChange
} from '../middleware/userValidators.js';
import {
    filterUserUpdateFields
} from '../middleware/updateValidators.js'

const router = express.Router();

//public
router.get('/:id', validateUserId, getUserHandler);

// owner and mod
router.patch('/:id', authenticate, validateUserId, filterUserUpdateFields, updateUserHandler);
router.delete('/:id', authenticate, validateUserId, deleteUserHandler);

//mod only
router.patch('/:id/role', authenticate, authorizeModerator, validateUserId, validateRoleChange, changeUserRoleHandler);

export default router;