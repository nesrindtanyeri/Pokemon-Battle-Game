import mongoose from 'mongoose';

const leaderboardSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  score: {
    type: Number,
    required: true,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);

export default Leaderboard;
