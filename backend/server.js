import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import leaderboardRoutes from "./routes/leaderboardRoutes.js";
import rosterRoutes from "./routes/rosterRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();

app.use(cors({
    origin: "http://localhost:5173"
}));
app.use(express.json());

connectDB();

app.use('/leaderboard', leaderboardRoutes);
app.use('/roster', rosterRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
