import express from 'express';
import { getUser, updateUser, deleteUser } from '../controllers/userController';

const router = express.Router();

// GET /user/:id
router.get('/:id', getUser);

// PUT /user/:id
router.put('/:id', updateUser);

// DELETE /user/:id
router.delete('/:id', deleteUser);

// GET /user/:id/items
router.get('/:id/items', (req, res) => {
  res.json({ message: "Items listed by user" });
});

// GET /user/:id/orders
router.get('/:id/orders', (req, res) => {
  res.json({ message: "Orders made by user" });
});

export default router;