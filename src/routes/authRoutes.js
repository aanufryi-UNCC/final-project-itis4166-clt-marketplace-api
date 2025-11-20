import express from 'express';
const router = express.Router();

// POST /auth/register
router.post('/register', (req, res) => {
  res.json({ message: "Register endpoint hit" });
});

// POST /auth/login
router.post('/login', (req, res) => {
  res.json({ message: "Login endpoint hit" });
});

// POST /auth/logout
router.post('/logout', (req, res) => {
  res.json({ message: "Logout successful." });
});

export default router;