import mongoose from "mongoose";
import User from "./models/userModel.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const createAdminAccount = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected");

    const adminExists = await User.findOne({ role: "admin" });
    if (adminExists) {
      console.log("Admin account already exists.");
      return;
    }

    const password = "admin123"; // Change this to a secure password
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new User({
      username: "admin",
      email: "admin@example.com",
      password: hashedPassword,
      role: "admin",
    });

    await admin.save();
    console.log("Admin account created successfully.");
  } catch (error) {
    console.error("Error creating admin account:", error);
  } finally {
    mongoose.connection.close();
  }
};

createAdminAccount();
