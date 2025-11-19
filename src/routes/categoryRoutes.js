import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.json(["Electronics", "Sports", "Kitchen"]);
});

export default router;