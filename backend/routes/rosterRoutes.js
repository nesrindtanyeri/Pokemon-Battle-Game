import express from 'express';
import { getRoster, addToRoster, removeFromRoster } from '../controllers/rosterController.js';

const router = express.Router();

// Fetch all Pokémon in the roster
router.get('/', getRoster);

// Add a new Pokémon to the roster
router.post('/', addToRoster);

// Remove a Pokémon from the roster
router.delete('/:id', removeFromRoster);

export default router;
