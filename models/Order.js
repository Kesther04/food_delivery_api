import mongoose from "mongoose";

// Schema and model for Order
const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
        {
        dishId: { type: mongoose.Schema.Types.ObjectId, ref: "Dish", required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true, default: 1 },
        },
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ["pending", "preparing", "on the way", "delivered", "cancelled"], default: "pending" },
    contactDetails: {type: String, required: true },
    deliveryAddress: { type: String, required: true },
    paymentMethod: { type: String, enum: ["credit card", "cash on delivery"], required: true },
}, { timestamps: true, minimize: false });

export const Order = mongoose.model("Order", orderSchema);
