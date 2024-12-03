require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const leaderboardRoutes = require('./routes/leaderboard.routes');
const rosterRoutes = require('./routes/roster.routes'); // Import roster routes
const errorHandler = require('./middlewares/errorHandler');

const app = express();


const cors = require("cors");

// Allow all origins or specify the frontend's origin
app.use(cors({
    origin: "http://localhost:5173" // Your frontend URL
}));



// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
connectDB();

// Define routes
app.use('/leaderboard', leaderboardRoutes);
app.use('/roster', rosterRoutes); // Add the roster route

// Error handling middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
