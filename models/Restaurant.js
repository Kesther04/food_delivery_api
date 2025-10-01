import mongoose from "mongoose";

//Schema and model for Restaurant
const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  rating: { type: Number, default: 4.3 },
  reviewCount: { type: Number, default: 340 },
}, { timestamps: true, minimize: false });

export const Restaurant = mongoose.model("Restaurant", restaurantSchema);
