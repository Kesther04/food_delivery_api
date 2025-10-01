import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { allDishes, alterDish, getDish } from "../controllers/DishController.js";


const router = express.Router();

// Protected Routes
router.post("/", authMiddleware, alterDish);
router.get("/:id", authMiddleware, getDish);
router.get("/",authMiddleware, allDishes);

export default router;