import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyRoster = () => {
  const [roster, setRoster] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoster = async () => {
      try {
        const response = await axios.get('http://localhost:3000/roster');
        setRoster(response.data);
        toast.success("Roster loaded successfully!");
      } catch (err) {
        setError('Failed to load roster');
        toast.error("Failed to load roster.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRoster();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  // Delete handler function with pokemon passed as an argument
  const handleClick = async (pokemonId) => {
    try {
      await axios.delete(`http://localhost:3000/roster/${pokemonId}`);
      setRoster(roster.filter((p) => p.id !== pokemonId));
      toast.success("Pokémon removed from roster!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove Pokémon.");
    }
  };

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <ToastContainer />
      <h1 className="text-3xl font-bold text-center text-primary mb-6">My Roster</h1>
      {roster.length === 0 ? (
        <div className="text-center text-gray-500">
          <p>Your roster is empty. Add some Pokémon!</p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {roster.map((pokemon) => (
            <li key={pokemon.id} className="bg-secondary p-4 rounded-lg shadow-lg">
              <img className="mx-auto h-32 w-32 object-contain" src={pokemon.sprite} alt={pokemon.name} />
              <h2 className="text-white text-xl font-bold text-center capitalize mt-4">{pokemon.name}</h2>
              <button className="btn btn-primary mt-4" onClick={() => handleClick(pokemon.id)}>Delete</button> {/* Pass pokemon.id */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyRoster;
