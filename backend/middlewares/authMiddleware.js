import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const authMiddleware = async (req, res, next) => {
  //const token = req.headers.authorization?.split(" ")[1] || req.cookies.token || req.query.token; // Extract token from the `Authorization` header

 // if (!token) {
  //  return res.status(401).json({ message: "Authentication token missing" });
 // }

 // try {
  //  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //  req.user = decoded;

  //  // Check if the user is an admin
   // if (!req.user.isAdmin) {
  //    return res.status(403).json({ message: "Access denied. Admins only." });
  //  }
  //  next();
//  } catch (error) {
 //   return res.status(401).json({ message: "Invalid or expired token" });
  //  }
  
  req.user = { id: "test-user-id", username: "TestUser" }; // Mock user data
next();

};

export default authMiddleware;
