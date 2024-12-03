const express = require('express');
const router = express.Router();
const { addToRoster } = require('../controllers/roster.controller');

// POST /roster: Add Pokémon to the roster
router.post('/', addToRoster);

module.exports = router;
