// services/OrderService.js
import { Order } from "../models/Order.js";

/**
 * @desc Create a new order for a user
 */
export const createOrderService = async (userId, orderData) => {
  const order = new Order({ userId, ...orderData });
  return await order.save();
};

/**
 * @desc Get all orders belonging to a user
 */
export const getUserOrdersService = async (userId) => {
  return await Order.find({ userId }).populate("items.dishId");
};

/**
 * @desc Get a single order by ID
 */
export const getOrderByIdService = async (orderId) => {
  return await Order.findById(orderId).populate("items.dishId");
};

/**
 * @desc Update the status of an order
 */
export const updateOrderStatusService = async (orderId, status) => {
  return await Order.findByIdAndUpdate(orderId, { status }, { new: true });
};

/**
 * @desc Delete an order by ID
 */
export const deleteOrderService = async (orderId) => {
  return await Order.findByIdAndDelete(orderId);
};
