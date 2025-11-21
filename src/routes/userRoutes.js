import express from 'express';
import { getUserHandler, updateUserHandler, deleteUserHandler } from '../controllers/userController.js';

const router = express.Router();

// GET /user/:id
router.get('/:id', getUserHandler);

// PUT /user/:id
router.put('/:id', updateUserHandler);

// DELETE /user/:id
router.delete('/:id', deleteUserHandler);

// GET /user/:id/items
router.get('/:id/items', (req, res) => {
  res.json({ message: "Items listed by user" });
});

// GET /user/:id/orders
router.get('/:id/orders', (req, res) => {
  res.json({ message: "Orders made by user" });
});

export default router;