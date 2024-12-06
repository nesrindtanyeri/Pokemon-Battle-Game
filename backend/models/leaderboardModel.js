import mongoose from "mongoose";

const leaderboardSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false
  }, // Reference to User
  score: {
    type: Number,
    required: true,
    default: 0,
    validate: {
      validator: (value) => value >= 0,
      message: "Score must be a non-negative number.",
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Add an index for optimized queries
leaderboardSchema.index({ score: -1, date: 1 });

export default mongoose.model("Leaderboard", leaderboardSchema);
