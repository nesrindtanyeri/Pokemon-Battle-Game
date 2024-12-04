import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BattlePage = () => {
  // Set states
  const [roster, setRoster] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [opponentPokemon, setOpponentPokemon] = useState(null);
  const [battleResult, setBattleResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Fetch roster
  useEffect(() => {
    const fetchRoster = async () => {
      try {
        const response = await axios.get('http://localhost:3000/roster');
        setRoster(response.data);
      } catch (err) {
        console.error('Failed to load roster', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRoster();
  }, []);

  // Fetch random opponent
  const fetchRandomPokemon = async () => {
    const randomId = Math.floor(Math.random() * 898) + 1; // Generate random ID (PokéAPI range)
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      return {
        id: response.data.id,
        name: response.data.name,
        sprite: response.data.sprites.front_default,
        stats: response.data.stats.map((stat) => ({
          name: stat.stat.name,
          base_stat: stat.base_stat, // Change from "value" to "base_stat"
        })) || [], // Fallback to empty array if stats are missing
      };
    } catch (err) {
      console.error('Error fetching opponent Pokémon:', err);
      return null; // Return null to signify an error
    }
  };

  // Handle battle
  const handleBattle = async () => {
    if (!selectedPokemon) {
      alert('Please select a Pokémon from your roster!');
      return;
    }

    setIsLoading(true);

    const opponent = await fetchRandomPokemon();
    setIsLoading(false);

    if (!opponent) {
      alert('Failed to fetch opponent Pokémon. Try again.');
      return;
    }

    setOpponentPokemon(opponent);

    // Safely calculate total stats
    const totalStatsUser = Array.isArray(selectedPokemon.stats) && selectedPokemon.stats.length > 0
      ? selectedPokemon.stats.reduce((acc, stat) => {
          return stat.base_stat ? acc + stat.base_stat : acc;
        }, 0)
      : 0;

    const totalStatsOpponent = Array.isArray(opponent.stats) && opponent.stats.length > 0
      ? opponent.stats.reduce((acc, stat) => {
          return stat.base_stat ? acc + stat.base_stat : acc;
        }, 0)
      : 0;

    console.log('Total Stats User:', totalStatsUser);
    console.log('Total Stats Opponent:', totalStatsOpponent);

    if (totalStatsUser > totalStatsOpponent) {
      setBattleResult(`${selectedPokemon.name} wins!`);
      try {
        await axios.post('http://localhost:3000/roster', opponent); 
        setRoster((prev) => [...prev, opponent]);
      } catch (err) {
        console.error('Error adding opponent to roster:', err);
      }
    } else if (totalStatsOpponent > totalStatsUser) {
      setBattleResult(`${opponent.name} wins!`);
      try {
        await axios.delete(`http://localhost:3000/roster/${selectedPokemon.id}`); 
        setRoster((prev) => prev.filter((p) => p.id !== selectedPokemon.id));
      } catch (err) {
        console.error('Error removing Pokémon from roster:', err);
      }
    } else {
      setBattleResult("It's a tie!");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-primary mb-6">Battle Arena</h1>

      {/* Roster Section */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Select Your Pokémon</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {roster.map((pokemon) => (
            <li
              key={pokemon.id}
              onClick={() => setSelectedPokemon(pokemon)}
              className={`cursor-pointer p-4 rounded-lg shadow-lg text-center ${
                selectedPokemon?.id === pokemon.id ? 'bg-primary text-white' : 'bg-secondary text-neutral'
              }`}
            >
              <img className="mx-auto h-24 w-24 object-contain" src={pokemon.sprite} alt={pokemon.name} />
              <p className="mt-2 text-lg font-semibold">{pokemon.name}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Battle Button */}
      <div className="text-center">
        <button
          onClick={handleBattle}
          className="btn btn-accent px-6 py-2 text-white font-bold rounded hover:bg-accent-focus"
          disabled={isLoading}
        >
          {isLoading ? 'Battling...' : 'Fight!'}
        </button>
      </div>

      {/* Battle Result */}
      {opponentPokemon && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-center mb-6">Battle Results</h2>
          <div className="flex justify-around items-center">
            {/* User's Pokémon */}
            <div className="text-center">
              <img src={selectedPokemon?.sprite} alt={selectedPokemon?.name} className="w-32 h-32 mx-auto" />
              <h3 className="text-xl font-semibold">{selectedPokemon?.name}</h3>
              <p>Total Stats: {Array.isArray(selectedPokemon?.stats) ? selectedPokemon.stats.reduce((acc, stat) => acc + stat.base_stat, 0) : 0}</p>
            </div>

            <h3 className="text-3xl font-bold text-center">VS</h3>

            {/* Opponent's Pokémon */}
            <div className="text-center">
              <img src={opponentPokemon?.sprite} alt={opponentPokemon?.name} className="w-32 h-32 mx-auto" />
              <h3 className="text-xl font-semibold">{opponentPokemon?.name}</h3>
              <p>Total Stats: {Array.isArray(opponentPokemon?.stats) ? opponentPokemon.stats.reduce((acc, stat) => acc + stat.base_stat, 0) : 0}</p>
            </div>
          </div>

          {/* Battle Outcome */}
          <div className="text-center mt-4">
            <h3 className="text-2xl font-bold">{battleResult}</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default BattlePage;


