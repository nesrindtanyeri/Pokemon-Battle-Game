import express from "express";
import { loginUser, registerUser } from "../controllers/authController.js";

const router = express.Router();

// POST /register: User registration route
router.post("/register", registerUser);
// POST /login: User login route
router.post("/login", loginUser);

export default router;
