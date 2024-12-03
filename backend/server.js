import dotenv from 'dotenv'; 
import express from 'express';
import connectDB from './config/database.js';
import leaderboardRoutes from './routes/leaderboardRoutes.js';
import rosterRoutes from './routes/rosterRoutes.js';
import errorHandler from './middlewares/errorHandler.js';
import cors from 'cors';

dotenv.config(); 

const app = express();


const cors = require("cors");

// Allow all origins or specify the frontend's origin
app.use(cors({
    origin: "http://localhost:5173" // Your frontend URL
}));



// Middleware to parse JSON
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Define routes
app.use('/leaderboard', leaderboardRoutes);
app.use('/roster', rosterRoutes); 

// Error handling middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

