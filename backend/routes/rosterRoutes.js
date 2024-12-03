import express from 'express'; 
import { getRoster, addToRoster, removeFromRoster } from '../controllers/rosterController.js';

const router = express.Router();

// GET /roster: Get the roster
router.get('/', getRoster);

// POST /roster: Add Pokémon to the roster
router.post('/', addToRoster);

// DELETE /roster/:id: Remove Pokémon from the roster
router.delete('/:id', removeFromRoster);

export default router;