// services/cart.service.js
import { Cart } from "../models/Cart.js";

// Get or create a user's cart
export const getOrCreateCart = async (userId) => {
  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = await Cart.create({ userId, items: [] });
  }
  return cart;
};

// Add or update an item in the cart
export const addOrUpdateCartItem = async (userId, dishId, price, quantity) => {
  const cart = await getOrCreateCart(userId);
  const itemIndex = cart.items.findIndex((item) => item.dishId.toString() === dishId);

  if (itemIndex > -1) {
    // Item already exists -> update quantity
    cart.items[itemIndex].quantity = quantity;
  } else {
    // Add new item
    cart.items.push({ dishId, price, quantity });
  }

  await cart.save();
  return cart;
};

// Remove a specific item from the cart
export const removeCartItem = async (userId, dishId) => {
  const cart = await getOrCreateCart(userId);
  cart.items = cart.items.filter((item) => item.dishId.toString() !== dishId);
  await cart.save();
  return cart;
};

// Clear all items in the user's cart
export const clearCart = async (userId) => {
  const cart = await getOrCreateCart(userId);
  cart.items = [];
  await cart.save();
  return cart;
};