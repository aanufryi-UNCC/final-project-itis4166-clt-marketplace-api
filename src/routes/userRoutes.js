import express from 'express';
const router = express.Router();

// GET /user/:id
router.get('/:id', (req, res) => {
  res.json({ message: "User profile fetched" });
});

// PUT /user/:id
router.put('/:id', (req, res) => {
  res.json({ message: "User updated" });
});

// DELETE /user/:id
router.delete('/:id', (req, res) => {
  res.status(204).send();
});

// GET /user/:id/items
router.get('/:id/items', (req, res) => {
  res.json({ message: "Items listed by user" });
});

// GET /user/:id/orders
router.get('/:id/orders', (req, res) => {
  res.json({ message: "Orders made by user" });
});

export default router;