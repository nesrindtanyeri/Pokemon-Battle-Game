import React, { useState, useEffect } from "react";
import axios from "axios";

const Battle = () => {
  const [userPokemon, setUserPokemon] = useState(null); // User's selected Pokémon
  const [opponentPokemon, setOpponentPokemon] = useState(null); // Opponent Pokémon
  const [result, setResult] = useState("");
  const [roster, setRoster] = useState([]); // User's roster

  // Fetch roster Pokémon and a random opponent Pokémon
  const fetchBattlePokemons = async () => {
    try {
      // Fetch user's roster Pokémon
      const rosterResponse = await axios.get("http://localhost:3000/roster");
      const rosterPokemons = rosterResponse.data;

      if (!rosterPokemons.length) {
        setResult("Your roster is empty! Add Pokémon to your roster to battle.");
        return;
      }

      setRoster(rosterPokemons);

      // Fetch a random opponent Pokémon
      const randomId = Math.floor(Math.random() * 150) + 1;
      const randomPokemonResponse = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${randomId}`
      );
      const randomPokemon = randomPokemonResponse.data;

      // Format stats for opponent Pokémon
      setOpponentPokemon({
        id: randomPokemon.id,
        name: randomPokemon.name,
        sprite: randomPokemon.sprites.front_default,
        attack: randomPokemon.stats.find((s) => s.stat.name === "attack").base_stat,
        defense: randomPokemon.stats.find((s) => s.stat.name === "defense").base_stat,
      });

      setResult(""); // Reset result for new battle
    } catch (error) {
      console.error("Failed to fetch Pokémon:", error);
    }
  };

  useEffect(() => {
    fetchBattlePokemons();
  }, []);

  // Handle battle logic
  const handleBattle = async () => {
    if (!userPokemon || !opponentPokemon) return;

    // Compare attack stats
    const userAttack = userPokemon.attack;
    const opponentAttack = opponentPokemon.attack;

    try {
      if (userAttack > opponentAttack) {
        setResult(`${userPokemon.name} wins!`);
        // Add opponent's Pokémon to roster
        await axios.post("http://localhost:3000/roster", opponentPokemon);
      } else if (opponentAttack > userAttack) {
        setResult(`${opponentPokemon.name} wins!`);
        // Remove user's Pokémon from roster
        await axios.delete(`http://localhost:3000/roster/${userPokemon.id}`);
      } else {
        setResult("It's a draw! No changes to the roster.");
      }

      // Refresh battle setup
      fetchBattlePokemons();
    } catch (error) {
      console.error("Error during battle:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center text-primary mb-6">
        Pokémon Battle
      </h1>

      {/* User's Roster */}
      <h2 className="text-xl font-bold text-secondary mb-4">Your Roster</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {roster.map((pokemon) => (
          <div
            key={pokemon.id}
            className={`card p-4 rounded ${
              userPokemon?.id === pokemon.id ? "border-4 border-accent" : ""
            }`}
            onClick={() => setUserPokemon(pokemon)}
          >
            <img
              src={pokemon.sprite}
              alt={pokemon.name}
              className="w-24 h-24 mx-auto"
            />
            <h2 className="text-lg font-bold text-center capitalize">
              {pokemon.name}
            </h2>
            <p className="text-sm text-center">Attack: {pokemon.attack}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-primary mb-4">VS</h2>

      {/* Opponent Pokémon */}
      {opponentPokemon && (
        <div className="card p-4 rounded shadow-lg">
          <img
            src={opponentPokemon.sprite}
            alt={opponentPokemon.name}
            className="w-24 h-24 mx-auto"
          />
          <h2 className="text-lg font-bold text-center capitalize mt-2">
            {opponentPokemon.name}
          </h2>
          <p className="text-sm text-center">Attack: {opponentPokemon.attack}</p>
        </div>
      )}

      {/* Battle Result */}
      {result && (
        <p className="text-lg font-semibold text-primary text-center my-4">
          {result}
        </p>
      )}

      {/* Battle Button */}
      <div className="flex justify-center">
        <button
          onClick={handleBattle}
          className="btn btn-primary px-6 py-2"
          disabled={!userPokemon}
        >
          Battle!
        </button>
      </div>
    </div>
  );
};

export default Battle;
