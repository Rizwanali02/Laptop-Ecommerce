import express from 'express';
import { getMyProfile, login, logout, register, updateProfile } from '../controllers/user.controller.js';
import { isAuthenticated } from "../middlewares/auth.js"

const router = express.Router();


router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/myprofile", isAuthenticated, getMyProfile);
router.put("/myprofile/:id", isAuthenticated, updateProfile);





export default router;