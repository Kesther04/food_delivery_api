import express from "express";
import { createUser, currentUser, checkUser, userFavorites } from "../controllers/UserController.js";
import authMiddleware  from "../middlewares/authMiddleware.js";

const router = express.Router();

//Public Routes
router.post("/signin",  checkUser);
router.post("/signup",  createUser);

// Protected Routes with (jwt)
router.get("/profile", authMiddleware, currentUser);
router.put("/favorites", authMiddleware, userFavorites);


export default router;