import express from "express";
import { loginUser, registerUser } from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { createAdmin } from "../controllers/authController.js";

const router = express.Router();

// POST /register: User registration route
router.post("/register", registerUser);
// POST /login: User login route
router.post("/login", loginUser);


// Admin-only route to create new admin accounts
router.post("/create-admin", /* authMiddleware, */ createAdmin);


export default router;
