import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PokemonDetails = () => {
  const { id } = useParams();
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
      console.log("Adding Pokémon:", pokemon); // Debug log
      
      // Ensure the full stats are included
      await axios.post("http://localhost:3000/roster", {
        id: pokemon.id,
        name: pokemon.name,
        sprite: pokemon.sprites.front_default,
        stats: pokemon.stats, // Add stats to the POST request
      });
      
      alert(`${pokemon.name} has been added to your roster!`);
    } catch (err) {
      console.error(
        "Error adding Pokémon to roster:",
        err.response?.data || err.message
      );
      alert("Failed to add Pokémon to roster.");
    }
  };
  

  if (error) return <p className="text-error">{error}</p>;
  if (!pokemon) return <p className="text-primary">Loading...</p>;

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center capitalize text-primary">
          {pokemon.name}
        </h1>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mt-6">
          {/* Pokémon Sprite */}
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
            className="w-64 h-64"
          />

          {/* Pokémon Stats */}
          <div className="flex-1 bg-secondary text-neutral p-4 rounded">
            <h2 className="text-xl font-semibold text-neutral">Stats</h2>
            <ul className="list-disc ml-6">
              {pokemon.stats.map((stat) => (
                <li key={stat.stat.name}>
                  {stat.stat.name}: {stat.base_stat}
                </li>
              ))}
            </ul>
          </div>

          {/* Pokémon Types */}
          <div className="flex-1 bg-secondary text-neutral p-4 rounded">
            <h2 className="text-xl font-semibold text-neutral">Types</h2>
            <ul className="list-disc ml-6">
              {pokemon.types.map((type) => (
                <li key={type.type.name}>{type.type.name}</li>
              ))}
            </ul>
          </div>

          {/* Pokémon Abilities */}
          <div className="flex-1 bg-secondary text-neutral p-4 rounded">
            <h2 className="text-xl font-semibold text-neutral">Abilities</h2>
            <ul className="list-disc ml-6">
              {pokemon.abilities.map((ability) => (
                <li key={ability.ability.name}>{ability.ability.name}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Add to Roster Button */}
        <button
          onClick={() => addToRoster(pokemon)}
          className="mt-6 px-6 py-2 bg-accent text-neutral font-bold rounded hover:bg-accent-focus"
        >
          Add to Roster
        </button>
      </div>
    </div>
  );
};

export default PokemonDetails;
