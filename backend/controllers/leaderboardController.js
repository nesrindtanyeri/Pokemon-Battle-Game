import Leaderboard from '../models/leaderboardModel.js';

export const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Leaderboard.find()
    .populate("userId", "username") // Populate username from User model
    .sort({ score: -1, date: 1 });
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch leaderboard.' });
  }
};

export const addOrUpdateLeaderboardEntry = async (req, res) => {
  const { username, score } = req.body;

  if (!username || score === undefined || isNaN(score) || score < 0) {
    return res.status(400).json({ message: 'Invalid data provided.' });
  }

  try {
      const existingPlayer = await Leaderboard.findOne({ username });

    if (existingPlayer) {
       existingPlayer.score += score; 
      await existingPlayer.save();
      return res.status(200).json({ message: 'Score updated.', player: existingPlayer });
    } else {
       const newEntry = new Leaderboard({
        username,
        score,
        date: new Date(),
      });

      const savedEntry = await newEntry.save();
      return res.status(201).json({ message: 'New entry added to leaderboard.', player: savedEntry });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to update leaderboard.', error: error.message });
  }
};
