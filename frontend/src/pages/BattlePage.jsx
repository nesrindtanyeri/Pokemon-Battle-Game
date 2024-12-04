import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Battle = () => {
  const [pokemon1, setPokemon1] = useState(null);
  const [pokemon2, setPokemon2] = useState(null);
  const [result, setResult] = useState("");
  const [score, setScore] = useState({
    wins: 0,
    losses: 0,
    xp: 0,
  });

  // Fetch two random Pokémon
  const fetchRandomPokemon = async () => {
    try {
      const id1 = Math.floor(Math.random() * 150) + 1;
      const id2 = Math.floor(Math.random() * 150) + 1;

      const response1 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id1}`);
      const response2 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id2}`);

      setPokemon1(response1.data);
      setPokemon2(response2.data);
      setResult(""); // Reset result for new battle
    } catch (error) {
      console.error("Failed to fetch Pokémon:", error);
    }
  };

  useEffect(() => {
    fetchRandomPokemon();
  }, []);

  // Handle battle logic
  const handleBattle = () => {
    if (!pokemon1 || !pokemon2) return;

    const stat1 = pokemon1.stats.reduce((sum, stat) => sum + stat.base_stat, 0);
    const stat2 = pokemon2.stats.reduce((sum, stat) => sum + stat.base_stat, 0);

    if (stat1 > stat2) {
      setResult(`${pokemon1.name} wins!`);
      setScore((prev) => ({
        ...prev,
        wins: prev.wins + 1,
        xp: prev.xp + 10,
      }));
    } else if (stat2 > stat1) {
      setResult(`${pokemon2.name} wins!`);
      setScore((prev) => ({
        ...prev,
        losses: prev.losses + 1,
      }));
    } else {
      setResult("It's a draw!");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center text-primary mb-6">Pokémon Battle</h1>

      <div className="flex flex-col sm:flex-row justify-around items-center gap-6 mb-6">
        {pokemon1 && (
          <motion.div
            className={`card bg-secondary text-neutral p-4 shadow-md rounded ${
              result.includes(pokemon1.name) ? "bg-success" : ""
            }`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={pokemon1.sprites.other["official-artwork"].front_default}
              alt={pokemon1.name}
              className="w-40 h-40 mx-auto"
            />
            <h2 className="text-xl font-bold capitalize text-center mt-4">{pokemon1.name}</h2>
            <p className="text-sm text-center">
              Total Stats: {pokemon1.stats.reduce((sum, stat) => sum + stat.base_stat, 0)}
            </p>
          </motion.div>
        )}

        <h2 className="text-2xl font-bold text-primary">VS</h2>

        {pokemon2 && (
          <motion.div
            className={`card bg-secondary text-neutral p-4 shadow-md rounded ${
              result.includes(pokemon2.name) ? "bg-success" : ""
            }`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={pokemon2.sprites.other["official-artwork"].front_default}
              alt={pokemon2.name}
              className="w-40 h-40 mx-auto"
            />
            <h2 className="text-xl font-bold capitalize text-center mt-4">{pokemon2.name}</h2>
            <p className="text-sm text-center">
              Total Stats: {pokemon2.stats.reduce((sum, stat) => sum + stat.base_stat, 0)}
            </p>
          </motion.div>
        )}
      </div>

      <div className="text-center mb-4">
        {result && <p className="text-lg font-semibold text-primary">{result}</p>}
      </div>

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
