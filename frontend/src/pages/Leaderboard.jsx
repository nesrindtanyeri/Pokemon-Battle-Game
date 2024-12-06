import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [username, setUsername] = useState("");
  const [score, setScore] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch leaderboard data
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get("http://localhost:3000/leaderboard");
        setLeaderboard(response.data);
      } catch (err) {
        console.error("Error fetching leaderboard:", err);
        toast.error("Failed to load leaderboard.");
        setError("Failed to load leaderboard.");
      }
    };

    fetchLeaderboard();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!username.trim() || !score || isNaN(score) || score < 0) {
      setError("Please enter a valid name and a positive score.");
      toast.error("Please enter a valid name and a positive score.");
      return;
    }

    try {
      await axios.post("http://localhost:3000/leaderboard", {
        username: username.trim(),
        score: parseInt(score),
      });
      setSuccess("Score successfully submitted!");
      toast.success("Score successfully submitted!");
      setUsername("");
      setScore("");

      // Reload leaderboard
      const response = await axios.get("http://localhost:3000/leaderboard");
      setLeaderboard(response.data);
    } catch (err) {
      console.error("Error submitting score:", err);
      setError("Failed to submit score. Please try again.");
      toast.error("Failed to submit score. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <h1 className="text-3xl font-bold text-center text-primary mb-6">
        Leaderboard
      </h1>
      <table className="table-auto w-full border-collapse border border-gray-300 mb-6">
        <thead>
          <tr className="bg-secondary text-neutral">
            <th className="border border-gray-300 px-4 py-2">Rank</th>
            <th className="border border-gray-300 px-4 py-2">Player</th>
            <th className="border border-gray-300 px-4 py-2">Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((player, index) => (
            <tr key={player.id || player._id} className="text-center">
              <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-300 px-4 py-2">{player.username}</td>
              <td className="border border-gray-300 px-4 py-2">{player.score}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <form onSubmit={handleSubmit} className="bg-base-100 p-4 rounded shadow border border-base-300">
  <h2 className="text-xl font-bold text-primary mb-4">
    Submit Your Score
  </h2>
  {error && <p className="text-error mb-2">{error}</p>}
  {success && <p className="text-success mb-2">{success}</p>}
  <div className="mb-4">
    <label className="block text-secondary mb-1" htmlFor="username">
      Name:
    </label>
    <input
      type="text"
      id="username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      className="input input-bordered w-full border border-secondary focus:border-primary focus:outline-none p-2 rounded"
    />
  </div>
  <div className="mb-4">
    <label className="block text-secondary mb-1" htmlFor="score">
      Score:
    </label>
    <input
      type="number"
      id="score"
      value={score}
      onChange={(e) => setScore(e.target.value)}
      className="input input-bordered w-full border border-secondary focus:border-primary focus:outline-none p-2 rounded"
    />
  </div>
  <button type="submit" className="btn btn-primary w-full">
    Submit
  </button>
</form>

    </div>
  );
};

export default Leaderboard;
