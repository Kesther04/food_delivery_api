import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { AllRestaurants, CreateRestaurant, RestaurantWithDishes, UpdateRestaurant } from "../controllers/RestaurantController.js";

const router = express.Router();

// Public Routes
router.get("/",AllRestaurants); 

// Protected Routes
router.post("/", authMiddleware, CreateRestaurant);
router.get("/:id", authMiddleware, RestaurantWithDishes);
router.put("/:id",  authMiddleware, UpdateRestaurant);

export default router;