import mongoose from "mongoose";

//Schema and model for Dish
const dishSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, enum: ["Meals", "Drinks & Desserts", "Snacks","Fast Food"], required: true },
  price: { type: Number, required: true },
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true },
  imageUrl: { type: String, required: true },
}, { timestamps: true, minimize: false });

export const Dish = mongoose.model("Dish", dishSchema);
