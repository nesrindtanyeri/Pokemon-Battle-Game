import express from "express";
import Leaderboard from "../models/leaderboardModel.js";
import { addScore, getLeaderboard } from "../controllers/leaderboardController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// GET /leaderboard: Fetch the leaderboard (no auth required)
router.get("/", getLeaderboard); async (req, res) => {
  try {
    const leaderboard = await Leaderboard.find().sort({ score: -1, date: 1 });
    res.json(leaderboard.map((entry) => ({ ...entry._doc, id: entry._id })));
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch leaderboard" });
  }
};

// Add new score
router.post("/", authMiddleware, addScore); async (req, res) => {
  const { username, score } = req.body;

  if (!username || !score || isNaN(score) || score < 0) {
    return res.status(400).json({ message: "Invalid input" });
  }

  try {
    const newScore = new Leaderboard({ username, score, date: new Date() });
    await newScore.save();
    res.status(201).json({ message: "Score added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to add score" });
  }
};

export default router;
