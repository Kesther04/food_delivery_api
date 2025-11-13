import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { createOrder,getUserOrders,getOrderById,updateOrderStatus,deleteOrder } from "../controllers/OrderController.js";

const router = express.Router();

// Get all orders for the logged-in user
router.get("/", authMiddleware, getUserOrders);

// Create a new order
router.post("/", authMiddleware, createOrder);

// Get a specific order by ID
router.get("/:id", authMiddleware, getOrderById);

// Update an order’s status
router.patch("/:id/status", authMiddleware, updateOrderStatus);

// Delete an order
router.delete("/:id", authMiddleware, deleteOrder);

export default router;
