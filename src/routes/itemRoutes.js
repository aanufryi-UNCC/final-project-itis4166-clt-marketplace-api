import express from 'express';
const router = express.Router();

// GET /items
router.get('/', (req, res) => {
  res.json({ message: "All items fetched" });
});

// POST /items
router.post('/', (req, res) => {
  res.json({ message: "Item created" });
});

// GET /items/:id
router.get('/:id', (req, res) => {
  res.json({ message: "Item details fetched" });
});

// PUT /items/:id
router.put('/:id', (req, res) => {
  res.json({ message: "Item updated" });
});

// DELETE /items/:id
router.delete('/:id', (req, res) => {
  res.status(204).send();
});

export default router;