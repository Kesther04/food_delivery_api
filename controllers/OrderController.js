// controllers/OrderController.js
import {
  createOrderService,
  getUserOrdersService,
  getOrderByIdService,
  updateOrderStatusService,
  deleteOrderService,
} from "../services/OrderService.js";

/**
 * @desc Create a new order
 * @route POST /api/orders
 * @access Private
 */
export const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items, totalAmount, contactDetails, deliveryAddress, paymentMethod } = req.body;

    if (!items || !totalAmount || !contactDetails || !deliveryAddress || !paymentMethod) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const order = await createOrderService(userId, {
      items,
      totalAmount,
      contactDetails,
      deliveryAddress,
      paymentMethod,
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * @desc Get all orders for a user
 * @route GET /api/orders
 * @access Private
 */
export const getUserOrders = async (req, res) => {
  try {
    const orders = await getUserOrdersService(req.user.id);
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * @desc Get a single order by ID
 * @route GET /api/orders/:id
 * @access Private
 */
export const getOrderById = async (req, res) => {
  try {
    const order = await getOrderByIdService(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * @desc Update order status
 * @route PATCH /api/orders/:id/status
 * @access Private
 */
export const updateOrderStatus = async (req, res) => {
  try {
    const updatedOrder = await updateOrderStatusService(req.params.id, req.body.status);
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * @desc Delete an order
 * @route DELETE /api/orders/:id
 * @access Private
 */
export const deleteOrder = async (req, res) => {
  try {
    await deleteOrderService(req.params.id);
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
