import Roster from '../models/rosterModel.js';

export const getTest = async (req, res) => {
  try {
    res.status(200).json({ message: 'Test route working' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getRoster = async (req, res) => {
  try {
    const roster = await Roster.find();
    res.json(roster);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Add a Pokémon to the roster
export const addToRoster = async (req, res) => {
  const { id, name, sprite } = req.body;

  // Validate required fields
  if (!id || !name || !sprite) {
    return res.status(400).json({ message: 'Incomplete Pokémon data' });
  }

  try {
    // Check if Pokémon already exists in the roster
    const existingPokemon = await Roster.findOne({ id });
    if (existingPokemon) {
      return res.status(400).json({ message: 'Pokémon already in roster' });
    }

    // Create new Pokémon entry
    const newPokemon = new Roster({ id, name, sprite });
    const savedPokemon = await newPokemon.save();

    // Exclude _id before sending back to frontend
    const { _id, ...pokemonData } = savedPokemon.toObject();

    // Send response
    res.status(201).json({ message: 'Pokémon added to roster', pokemon: pokemonData });
  } catch (err) {
    console.error('Error adding Pokémon to roster:', err.message); // Log error
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Remove a Pokémon from the roster
export const removeFromRoster = async (req, res) => {
  const { id } = req.params;
  try {
    // Check if Pokémon exists in the roster
    const existingPokemon = await Roster.findOne({ id });
    if (!existingPokemon) {
      return res.status(404).json({ message: 'Pokémon not found in roster' });
    }

    // Remove the Pokémon
    await Roster.findOneAndDelete({ id });

    res.status(200).json({ message: 'Pokémon removed from roster' });
  } catch (err) {
    console.error('Error removing Pokémon from roster:', err.message); // Log error
    res.status(500).json({ message: 'Internal server error' });
  }
};
