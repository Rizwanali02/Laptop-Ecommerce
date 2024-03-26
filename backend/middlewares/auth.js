import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ErrorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";


const isAuthenticated = async (req, res, next) => {
  // Check if token is in cookies or headers
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
 
  if (!token) {
     return res.status(400).json({ success: false, message: "User is not authenticated" });
  }
 
  try {
     // Verify the token
     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
     const user = await User.findById(decoded.id);
     if (!user) {
       return res.status(400).json({ success: false, message: "User not found" });
     }
     req.user = user;
     next();
  } catch (error) {
     console.error("Token verification failed:", error);
     return res.status(401).json({ success: false, message: "Invalid token" });
  }
 };


const isAuthorized = (isAdminRequired) => {
  return (req, res, next) => {
    if (isAdminRequired && req.user.isAdmin === true) {
      next(); 
    } else {
      return next(new ErrorHandler(`You are not an Admin`, 403));
    }
  };
};

export {
  isAuthenticated,
  isAuthorized
};



