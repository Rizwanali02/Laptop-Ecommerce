import express from "express"
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";
import { deleteLapy, getAllLapy, getMylapys, getSingleLapy, lapyPost, updateLapy } from "../controllers/lapy.controller.js";

const router = express.Router()

router.post("/post", isAuthenticated, isAuthorized(true), lapyPost)
router.delete("/delete/:id", deleteLapy)
router.get("/all", getAllLapy);
router.get("/singlelapy/:id", getSingleLapy);
router.get("/mylapys", isAuthenticated, isAuthorized(true), getMylapys)
router.put("/update/:id", updateLapy)

export default router;