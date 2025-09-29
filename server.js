import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/UserRoutes.js";

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Global Middlewares
app.use(cors()); // allow frontend access
app.use(express.json()); // parse JSON

// Routes
app.get("/", (req, res) => res.send("Welcome to the SavorySwift API"));
app.use("/users", userRoutes);

// Error handler middleware (catch all)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server Error" });
});

// server connection listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
