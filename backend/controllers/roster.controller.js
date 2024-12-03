const Roster = require('../models/roster.model');

// Add a Pokémon to the roster
const addToRoster = async (req, res) => {
  const { id, name, sprite } = req.body;

  if (!id || !name || !sprite) {
    return res.status(400).json({ message: 'Incomplete Pokémon data' });
  }

  try {
    const existingPokemon = await Roster.findOne({ id });
    if (existingPokemon) {
      return res.status(400).json({ message: 'Pokémon already in roster' });
    }

    const newPokemon = new Roster({ id, name, sprite });
    const savedPokemon = await newPokemon.save();
    res.status(201).json(savedPokemon);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addToRoster };
    