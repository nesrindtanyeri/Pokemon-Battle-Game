import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PokemonDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        setPokemon(response.data);
      } catch (err) {
        setError("Failed to fetch Pokémon details");
      }
    };

    fetchPokemon();
  }, [id]);

  const addToRoster = async (pokemon) => {
    try {
      await axios.post("http://localhost:3000/roster", {
        id: pokemon.id,
        name: pokemon.name,
        sprite: pokemon.sprites.front_default,
        stats: pokemon.stats,
      });
      alert(`${pokemon.name} has been added to your roster!`);
    } catch (err) {
      console.error("Error adding Pokémon to roster:", err.response?.data || err.message);
      alert("Failed to add Pokémon to roster.");
    }
  };

  // Navigate to a specific Pokémon ID
  const navigateToPokemon = (newId) => {
    if (newId >= 1 && newId <= 898) { // Valid Pokémon ID range
      navigate(`/pokemon/${newId}`);
    }
  };

  if (error) return <p className="text-error text-center mt-10">{error}</p>;
  if (!pokemon) return <p className="text-primary text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-base-100 flex flex-col justify-center items-center py-10 border border-black border-b">
      <div className="container mx-auto max-w-4xl p-6 bg-base-100 rounded-lg shadow-md border border-black border-200">
        <h1 className="text-4xl font-bold text-center capitalize text-primary mb-6">
          {pokemon.name}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pokémon Sprite */}
          <div className="col-span-1 flex justify-center items-center">
            <img
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt={pokemon.name}
              className="w-64 h-64 rounded-lg border border-black border-200"
            />
          </div>

          {/* Pokémon Stats */}
          <div className="col-span-2">
            <div className="bg-base-100 p-4 rounded-lg shadow-sm mb-4 border border-black border-200">
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Stats</h2>
              <ul className="grid grid-cols-2 gap-2">
                {pokemon.stats.map((stat) => (
                  <li key={stat.stat.name} className="flex justify-between">
                    <span className="capitalize">{stat.stat.name}</span>
                    <span className="font-bold">{stat.base_stat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pokémon Types */}
            <div className="bg-base-100 p-4 rounded-lg shadow-sm mb-4 border border-black border-200">
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Types</h2>
              <ul className="flex space-x-4">
                {pokemon.types.map((type) => (
                  <li
                    key={type.type.name}
                    className="capitalize bg-gray-200 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold"
                  >
                    {type.type.name}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pokémon Abilities */}
            <div className="bg-base-100 p-4 rounded-lg shadow-sm border border-black border-200">
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Abilities</h2>
              <ul className="grid grid-cols-2 gap-2">
                {pokemon.abilities.map((ability) => (
                  <li
                    key={ability.ability.name}
                    className="capitalize bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold"
                  >
                    {ability.ability.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Add to Roster Button */}
        <div className="text-center mt-6">
          <button
            onClick={() => addToRoster(pokemon)}
            className="px-8 py-3 bg-gray-200 text-black font-bold rounded-lg shadow hover:bg-accent-focus transition-transform transform hover:scale-105"
          >
            Add to Roster
          </button>
        </div>

        {/* Pagination Buttons */}
        <div className="flex justify-between mt-10">
          <button
            onClick={() => navigateToPokemon(parseInt(id) - 1)}
            disabled={parseInt(id) <= 1} // Disable if ID is already 1
            className="px-4 py-2 bg-gray-200 text-gray-800 font-bold rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => navigateToPokemon(parseInt(id) + 1)}
            disabled={parseInt(id) >= 898} // Disable if ID is the maximum
            className="px-4 py-2 bg-gray-200 text-gray-800 font-bold rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;


