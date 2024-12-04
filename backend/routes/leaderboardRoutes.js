import express from 'express';
import { getLeaderboard, addScore } from '../controllers/leaderboardController.js';

const router = express.Router();

// GET /leaderboard: Get the leaderboard
router.get('/', getLeaderboard);

// POST /leaderboard: Add a new score
router.post('/', addScore);

export default router;

