import express from 'express';
const router = express.Router();

// POST /orders
router.post('/', (req, res) => {
    res.json({ message: "Order created "});
});

// GET /orders/:id
router.get('/:id', (req, res) => {
  res.json({ message: "Order details fetched" });
});

// PUT /orders/:id/status
router.put('/:id/status', (req, res) => {
  res.json({ message: "Order status updated" });
});

// GET /orders  (moderators only)
router.get('/', (req, res) => {
  res.json({ message: "All orders fetched" });
});

export default router;