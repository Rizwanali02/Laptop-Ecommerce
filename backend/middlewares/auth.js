import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ErrorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";


const isAuthenticated = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("User is not authenticated", 400));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return next(new ErrorHandler("Invalid token", 401));
  }
});


const isAuthorized = (isAdminRequired) => {
  return (req, res, next) => {
    if (isAdminRequired && req.user.isAdmin === true) {
      next(); // Call next() only if isAdmin is true and admin authorization is required
    } else {
      return next(new ErrorHandler(`You are not an Admin`, 403)); 
    }
  };
};

export {
  isAuthenticated,
  isAuthorized
};



