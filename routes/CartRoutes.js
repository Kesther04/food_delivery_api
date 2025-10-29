import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { clearUserCart, createOrUpdateCart, deleteCartItem, getCart } from "../controllers/CartController.js";

const router = express.Router();

router.get("/", authMiddleware, getCart);
router.post("/", authMiddleware, createOrUpdateCart);
router.delete("/:dishId", authMiddleware, deleteCartItem);
router.delete("/", authMiddleware, clearUserCart);

export default router;