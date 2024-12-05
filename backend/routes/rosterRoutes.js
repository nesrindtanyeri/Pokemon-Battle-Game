import express from 'express';
import { getTest, getRoster, addToRoster, removeFromRoster } from '../controllers/rosterController.js';
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Test Route: GET /test
router.get('/test', getTest);

// Get Roster: GET /roster
router.get('/', getRoster);

// Add to Roster: POST /roster
router.post('/', addToRoster);

// Remove from Roster: DELETE /roster/:id
router.delete('/:id', removeFromRoster);

export default router;

