import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Homepage = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonList = async () => {
      console.log("Fetching Pokémon list...");
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=16'); // Adjust limit as needed
        console.log("Fetched Pokémon list:", response.data.results);
        setPokemonList(response.data.results);
        console.log("Updated Pokémon List State:", response.data.results);
        toast.success("Pokémon list loaded successfully!");
      } catch (err) {
        console.error("Error fetching Pokémon:", err);
        setError("Failed to load Pokémon. Please try again later.");
        toast.error("Failed to load Pokémon. Please try again.");
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
    return (
      <p className="text-center text-primary">
        No Pokémon available to display.
      </p>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      {/* Hero Section */}
      <div className="relative bg-black rounded-lg overflow-hidden mb-8">
        <iframe
          className="w-full h-64 sm:h-96 md:h-[500px] mx-auto"
          src="https://www.youtube.com/embed/rg6CiPI6h2g?autoplay=1&mute=1&loop=1&playlist=rg6CiPI6h2g"
          title="Pokemon Hero Video"
          frameBorder="0"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        ></iframe>
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center"></div>
      </div>

      {/* Pokémon List */}
      <h1 className="text-3xl font-bold text-center text-primary mb-6">
        Pokémon List
      </h1>
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
              <h2 className="text-xl font-bold text-center capitalize mt-4">
                {pokemon.name}
              </h2>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Homepage;
