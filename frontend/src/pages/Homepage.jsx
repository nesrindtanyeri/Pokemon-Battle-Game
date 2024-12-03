import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Homepage = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonList = async () => {
      console.log("Fetching Pokémon list...");
      try {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=50");
        console.log("Fetched Pokémon list:", response.data.results);
        setPokemonList(response.data.results);
        console.log("Updated Pokémon List State:", response.data.results);
      } catch (err) {
        console.error("Error fetching Pokémon:", err);
        setError("Failed to load Pokémon. Please try again later.");
      } finally {
        setLoading(false); // Ensure loading is set to false
      }
    };

    fetchPokemonList();
  }, []);

  console.log("Pokemon List:", pokemonList);

  if (loading) {
    console.log("Loading state active");
    return <p className="text-primary text-center mt-4">Loading Pokémon...</p>;
  }

  if (error) {
    console.log("Error state active");
    return <p className="text-error text-center">{error}</p>;
  }

  if (!pokemonList || pokemonList.length === 0) {
    console.log("No Pokémon to display");
    return <p className="text-center text-primary">No Pokémon available to display.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center text-primary mb-6">Pokémon List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {pokemonList.map((pokemon, index) => {
          const pokemonId = index + 1; // PokeAPI IDs start from 1
          return (
            <Link
              to={`/pokemon/${pokemonId}`}
              key={pokemonId}
              className="bg-secondary text-neutral p-4 rounded shadow hover:shadow-lg transition duration-200"
            >
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
                alt={pokemon.name}
                className="w-32 h-32 mx-auto"
              />
              <h2 className="text-xl font-bold text-center capitalize mt-4">{pokemon.name}</h2>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Homepage;
