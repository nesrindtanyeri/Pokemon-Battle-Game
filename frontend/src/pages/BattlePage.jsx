import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

const Battle = () => {
  const [pokemon2, setPokemon2] = useState(null); // Random Pokémon
  const [roster, setRoster] = useState([]); // User's roster
  const [selectedPokemon, setSelectedPokemon] = useState(null); // Selected Pokémon
  const [result, setResult] = useState("");
  const [score, setScore] = useState({
    wins: 0,
    losses: 0,
    xp: 0,
  });

  // Fetch roster Pokémon and a random Pokémon
  const fetchBattlePokemons = async () => {
    try {
      // Fetch user's roster Pokémon
      const rosterResponse = await axios.get("http://localhost:3000/roster");
      const rosterPokemons = rosterResponse.data;
      

      if (!rosterPokemons.length) {
        setRoster("Your roster is empty! Add Pokémon to your roster to battle.");
        toast.error("Your roster is empty!");
        return;
      }

      setRoster(rosterPokemons);
      setSelectedPokemon(rosterPokemons[0]); // Default to the first Pokémon

      // Fetch a random Pokémon
      const randomId = Math.floor(Math.random() * 150) + 1;
      const randomPokemonResponse = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${randomId}`
      );
      const randomPokemon = randomPokemonResponse.data;

      // Format stats for random Pokémon
      const formattedStats = randomPokemon.stats.map((stat) => ({
        name: stat.stat.name,
        base_stat: stat.base_stat,
      }));
      setPokemon2({
        id: randomPokemon.id,
        name: randomPokemon.name,
        sprite: randomPokemon.sprites.other["official-artwork"].front_default,
        stats: formattedStats,
      });

      setResult(""); // Reset result for new battle
    } catch (error) {
      console.error("Failed to fetch Pokémon data:", error);
      toast.error("Failed to fetch Pokémon data.");
    }
  };

  useEffect(() => {
    fetchBattlePokemons();
  }, []);

  // Add winner to roster
  const addToRoster = async (pokemon) => {
    try {
      await axios.post("http://localhost:3000/roster", pokemon);
      console.log(`${pokemon.name} added to roster!`);
      toast.success(`You win! ${pokemon.name} added to roster!`);
    } catch (err) {
      console.error("Failed to add Pokémon to roster:", err.message);
      toast.error("Failed to add Pokémon to roster.");
    }
  };

  // Remove loser from roster
  const removeFromRoster = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/roster/${id}`);
      console.log(`Pokémon with ID ${id} removed from roster.`);
      toast.info("You Lost! Pokémon removed from roster.");
    } catch (err) {
      console.error("Failed to remove Pokémon from roster:", err.message);
      toast.error("Failed to remove Pokémon from roster.");
    }
  };

  // Update leaderboard
  const updateLeaderboard = async (username, xp) => {
    try {
      const token = localStorage.getItem("token"); // Assume user is logged in
      await axios.post(
        "http://localhost:3000/leaderboard",
        { username, score: xp },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Leaderboard updated!");
    } catch (err) {
      console.error("Failed to update leaderboard:", err.message);
      toast.error("Failed to update leaderboard.");
    }
  };

  // Handle battle logic
  const handleBattle = async () => {
    if (!selectedPokemon || !pokemon2) return;
  
    const userPokemonStats = selectedPokemon.stats.reduce(
      (sum, stat) => sum + stat.base_stat,
      0
    );
    const opponentPokemonStats = pokemon2.stats.reduce(
      (sum, stat) => sum + stat.base_stat,
      0
    );
  
    try {
      if (userPokemonStats > opponentPokemonStats) {
        setResult(`${selectedPokemon.name} wins! You win ${pokemon2.name}.`);
              setScore((prev) => ({
          ...prev,
          wins: prev.wins + 1,
          xp: prev.xp + 10,
        }));
  
        await addToRoster(pokemon2); // Add opponent Pokémon to user's roster
        await updateLeaderboard("Player", score.xp + 10); // Update leaderboard for player
  
      } else if (opponentPokemonStats > userPokemonStats) {
        setResult(`${pokemon2.name} wins! You lose ${selectedPokemon.name}.`);
               setScore((prev) => ({
          ...prev,
          losses: prev.losses + 1,
        }));
  
        await removeFromRoster(selectedPokemon.id); // Remove user's Pokémon
        await updateLeaderboard("Computer", 10); // Update leaderboard for computer
  
      } else {
        setResult("It's a draw!");
        toast.info("It's a draw!");
      }
  
      fetchBattlePokemons();
    } catch (error) {
      console.error("Error during battle:", error);
      toast.error("An error occurred during the battle.");
    }
    setResult("");
  };
  


  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <h1 className="text-3xl font-bold text-center text-primary mb-6">
        Pokémon Battle
      </h1>
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
            <img
              src={pokemon.sprite}
              alt={pokemon.name}
              className="w-40 h-40 mx-auto"
            />
            <h2 className="text-xl font-bold capitalize text-center mt-4">
              {pokemon.name}
            </h2>
            <p className="text-sm text-center">
              Total Stats:{" "}
              {pokemon.stats.reduce((sum, stat) => sum + stat.base_stat, 0)}
            </p>
          </motion.div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-primary text-center mb-4">VS</h2>

      {pokemon2 && (
  <div className="flex justify-center items-center mb-6">
    <motion.div
      className="card bg-secondary text-neutral p-4 shadow-md rounded w-1/4"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <img
        src={pokemon2.sprite}
        alt={pokemon2.name}
        className="w-40 h-40 mx-auto"
      />
      <h2 className="text-xl font-bold capitalize text-center mt-4">
        {pokemon2.name}
      </h2>
      <p className="text-sm text-center">
        Total Stats:{" "}
        {pokemon2.stats.reduce((sum, stat) => sum + stat.base_stat, 0)}
      </p>
    </motion.div>
  </div>
)}



      {result && (
        <p className="text-lg font-semibold text-primary text-center mb-4 p-4">
          {result}
        </p>
      )}

      <div className="flex justify-center gap-4 p-4">
        <motion.button
          onClick={handleBattle}
          className="btn btn-primary px-6 py-2"
          whileTap={{ scale: 0.9 }}
        >
          Battle!
        </motion.button>
        <motion.button
          onClick={fetchBattlePokemons}
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
