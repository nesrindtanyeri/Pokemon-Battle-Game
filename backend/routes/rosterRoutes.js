import express from 'express'; 
import { getTest, getRoster, addToRoster, removeFromRoster } from '../controllers/rosterController.js';

const router = express.Router();

// GET /test: Test route
router.get('/test', getTest);

// GET /roster: Get the roster
router.get('/', getRoster);

// POST /roster: Add Pokémon to the roster
router.post('/', addToRoster);

// DELETE /roster/:id: Remove Pokémon from the roster
router.delete('/:id', removeFromRoster);

export default router;