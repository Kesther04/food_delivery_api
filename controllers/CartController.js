// controllers/CartController.js
import {
  addOrUpdateCartItem,
  removeCartItem,
  clearCart,
  getOrCreateCart,
} from "../services/CartService.js";

/**
 * @desc Get a user's cart
 * @route GET /api/cart
 * @access Private
 */
export const getCart = async (req, res) => {
  try {
    const cart = await getOrCreateCart(req.user.id);
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * @desc Add or update a cart item
 * @route POST /api/cart
 * @access Private
 */
export const createOrUpdateCart = async (req, res) => {
  const { dishId, price, quantity } = req.body;
  if (!dishId || !quantity || !price) {
    return res.status(400).json({ message: "Dish ID, price, and quantity are required." });
  }

  try {
    const cart = await addOrUpdateCartItem(req.user.id, dishId, price, quantity);
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * @desc Remove a cart item
 * @route DELETE /api/cart/:dishId
 * @access Private
 */
export const deleteCartItem = async (req, res) => {
  const { dishId } = req.params;
  try {
    const cart = await removeCartItem(req.user.id, dishId);
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * @desc Clear user's cart
 * @route DELETE /api/cart
 * @access Private
 */
export const clearUserCart = async (req, res) => {
  try {
    const cart = await clearCart(req.user.id);
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
