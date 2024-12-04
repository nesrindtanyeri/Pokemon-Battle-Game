import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Battle = () => {
  const [roster, setRoster] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [randomPokemon, setRandomPokemon] = useState(null);
  const [result, setResult] = useState("");
  const [score, setScore] = useState({
    wins: 0,
    losses: 0,
    xp: 0,
  });

  // Fetch roster Pokémon
  useEffect(() => {
    const fetchRoster = async () => {
      try {
        const response = await axios.get("http://localhost:3000/roster");
        setRoster(response.data);
      } catch (error) {
        console.error("Failed to fetch roster:", error);
      }
    };

    fetchRoster();
  }, []);

  // Fetch a random Pokémon
  const fetchRandomPokemon = async () => {
    try {
      const id = Math.floor(Math.random() * 150) + 1;
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      setRandomPokemon({
        id: response.data.id,
        name: response.data.name,
        sprite: response.data.sprites.other["official-artwork"].front_default,
        stats: response.data.stats.map((stat) => ({
          name: stat.stat.name,
          base_stat: stat.base_stat,
        })),
      });
      setResult(""); // Reset result
    } catch (error) {
      console.error("Failed to fetch random Pokémon:", error);
    }
  };

  useEffect(() => {
    fetchRandomPokemon();
  }, []);

  // Handle battle logic
  const handleBattle = async () => {
    if (!selectedPokemon || !randomPokemon) {
      console.error("Battle cannot proceed: Missing Pokémon.");
      return;
    }
  
    console.log("Selected Pokémon:", selectedPokemon);
    console.log("Random Pokémon:", randomPokemon);
  
    // Ensure stats are properly defined and are arrays
    const userStats = Array.isArray(selectedPokemon.stats)
      ? selectedPokemon.stats.reduce((sum, stat) => sum + (stat.base_stat || 0), 0)
      : 0;
  
    const randomStats = Array.isArray(randomPokemon.stats)
      ? randomPokemon.stats.reduce((sum, stat) => sum + (stat.base_stat || 0), 0)
      : 0;
  
    console.log("Selected Pokémon Total Stats:", userStats);
    console.log("Random Pokémon Total Stats:", randomStats);
  
    if (userStats > randomStats) {
      setResult(`${selectedPokemon.name} wins!`);
      setScore((prev) => ({
        ...prev,
        wins: prev.wins + 1,
        xp: prev.xp + 10,
      }));
  
      try {
        await axios.post("http://localhost:3000/roster", randomPokemon);
        console.log("Random Pokémon added to roster.");
      } catch (error) {
        console.error("Failed to add Pokémon to roster:", error);
      }
    } else {
      setResult(`${randomPokemon.name} wins!`);
      setScore((prev) => ({
        ...prev,
        losses: prev.losses + 1,
      }));
  
      try {
        await axios.delete(`http://localhost:3000/roster/${selectedPokemon.id}`);
        setRoster((prev) => prev.filter((poke) => poke.id !== selectedPokemon.id));
        console.log("Selected Pokémon removed from roster.");
      } catch (error) {
        console.error("Failed to remove Pokémon from roster:", error);
      }
    }
  };
  
  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center text-primary mb-6">Pokémon Battle</h1>

      {/* Roster Pokémon */}
      <h2 className="text-xl font-bold text-secondary mb-4">Your Roster</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        {roster.map((pokemon) => (
          <motion.div
            key={pokemon.id}
            className={`card bg-secondary text-neutral p-4 shadow-md rounded ${
              selectedPokemon?.id === pokemon.id ? "border-4 border-accent" : ""
            }`}
            onClick={() => setSelectedPokemon(pokemon)}
            whileHover={{ scale: 1.05 }}
          >
            <img src={pokemon.sprite} alt={pokemon.name} className="w-32 h-32 mx-auto" />
            <h3 className="text-center capitalize mt-2">{pokemon.name}</h3>
          </motion.div>
        ))}
      </div>

      {/* Random Pokémon */}
      <h2 className="text-xl font-bold text-secondary mb-4">Random Pokémon</h2>
      {randomPokemon && (
        <motion.div
          className="card bg-secondary text-neutral p-4 shadow-md rounded mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={randomPokemon.sprite}
            alt={randomPokemon.name}
            className="w-32 h-32 mx-auto"
          />
          <h3 className="text-center capitalize mt-2">{randomPokemon.name}</h3>
          <p className="text-center">
            Total Stats: {randomPokemon.stats.reduce((sum, stat) => sum + stat.base_stat, 0)}
          </p>
        </motion.div>
      )}

      {/* Battle Result */}
      {result && <p className="text-lg font-semibold text-primary text-center mb-4">{result}</p>}

      {/* Battle Buttons */}
      <div className="flex justify-center gap-4">
        <motion.button
          onClick={handleBattle}
          className="btn btn-primary px-6 py-2"
          whileTap={{ scale: 0.9 }}
        >
          Battle!
        </motion.button>
        <motion.button
          onClick={fetchRandomPokemon}
          className="btn btn-secondary px-6 py-2"
          whileHover={{ scale: 1.1 }}
        >
          New Battle
        </motion.button>
      </div>

      {/* Scoreboard */}
      <div className="bg-base-200 p-4 mt-6 rounded shadow-md">
        <h2 className="text-xl font-bold text-primary mb-4">Scoreboard</h2>
        <p>Wins: {score.wins}</p>
        <p>Losses: {score.losses}</p>
        <p>XP: {score.xp}</p>
      </div>
    </div>
  );
};

export default Battle;
