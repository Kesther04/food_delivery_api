import mongoose from "mongoose";

//Schema and model for Cart
const cartItemSchema = new mongoose.Schema({
  dishId: { type: mongoose.Schema.Types.ObjectId, ref: "Dish", required: true },
  price: { type: Number, required:true },
  quantity: { type: Number, required: true, default: 1 },
});

export const CartItem = mongoose.model("CartItem", cartItemSchema);

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  items: [cartItemSchema],
}, { timestamps: true, minimize: false });

export const Cart = mongoose.model("Cart", cartSchema);