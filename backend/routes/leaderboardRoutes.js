import express from "express";
import { addOrUpdateLeaderboardEntry, getLeaderboard } from "../controllers/leaderboardController.js";

const router = express.Router();

// GET /leaderboard: Fetch the leaderboard (no auth required)
router.get("/", getLeaderboard); 

// Add new score
router.post("/",  addOrUpdateLeaderboardEntry); 



export default router;
