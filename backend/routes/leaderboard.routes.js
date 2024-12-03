const express = require('express');
const router = express.Router();
const { getLeaderboard, addScore } = require('../controllers/leaderboard.controller');

// Define GET route for fetching leaderboard
router.get('/', getLeaderboard);

// Define POST route for adding a new score
router.post('/', addScore);

module.exports = router;
