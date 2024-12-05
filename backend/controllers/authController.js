import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/userModel.js"; 

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role }, // Include role in the payload
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createAdmin = async (req, res) => {
  const { username, email, password } = req.body;

  // Check if the user is an admin
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }

  try {
    // Check if the admin already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Admin account already exists." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new admin account
    const newAdmin = new User({
      username,
      email,
      password: hashedPassword,
      role: "admin", // Explicitly set the role to admin
    });

    await newAdmin.save();
    res.status(201).json({ message: "Admin account created successfully." });
  } catch (error) {
    res.status(500).json({ message: "Failed to create admin account." });
  }
};
