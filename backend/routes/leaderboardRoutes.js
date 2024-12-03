import express from 'express';
import { getLeaderboard, addScore } from '../controllers/leaderboardController.js';

const router = express.Router();

// Define GET route for fetching leaderboard
router.get('/', getLeaderboard);

// Define POST route for adding a new score
router.post('/', addScore);

export default router;