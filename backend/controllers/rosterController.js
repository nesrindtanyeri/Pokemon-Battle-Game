import Roster from '../models/rosterModel.js';

// Test Route
export const getTest = async (req, res) => {
  try {
    res.status(200).json({ message: 'Test route working' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch the roster
export const getRoster = async (req, res) => {
  try {
    const roster = await Roster.find();
    res.json(roster);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch roster.' });
  }
};

// Add a Pokémon to the roster
export const addToRoster = async (req, res) => {
  const { id, name, sprite, stats } = req.body;

  // Validate request body
  if (!id || !name || !sprite || !stats) {
    return res.status(400).json({ message: 'Incomplete Pokémon data.' });
  }

  try {
    // Check if the Pokémon already exists in the roster
    const existingPokemon = await Roster.findOne({ id });
    if (existingPokemon) {
      return res.status(400).json({ message: 'Pokémon already exists in the roster.' });
    }

    // Create a new Pokémon document
    const newPokemon = new Roster({ id, name, sprite, stats });
    const savedPokemon = await newPokemon.save();

    // Respond with success
    res.status(201).json({ message: 'Pokémon added to roster.', pokemon: savedPokemon });
  } catch (error) {
    // Handle server error
    console.error('Error adding Pokémon to roster:', error);
    res.status(500).json({ message: 'Failed to add Pokémon to roster.', error: error.message });
  }
};


// Remove a Pokémon from the roster
export const removeFromRoster = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPokemon = await Roster.findOneAndDelete({ id });
    if (!deletedPokemon) {
      return res.status(404).json({ message: 'Pokémon not found in the roster.' });
         }

    res.status(200).json({ message: 'Pokémon removed from roster.', pokemon: deletedPokemon });
  } catch (error) {
    res.status(500).json({ message: 'Failed to remove Pokémon from roster.' });
  }
};
