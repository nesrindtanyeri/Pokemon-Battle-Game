const express = require("express");
const router = express.Router();
const Leaderboard = require("../models/leaderboard.model");

// Fetch leaderboard
router.get("/", async (req, res) => {
  try {
    const leaderboard = await Leaderboard.find().sort({ score: -1, date: 1 });
    res.json(leaderboard.map((entry) => ({ ...entry._doc, id: entry._id }))); // Add `id` for React keys
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch leaderboard" });
  }
});


// Add new score
router.post("/", async (req, res) => {
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
});

module.exports = router;

