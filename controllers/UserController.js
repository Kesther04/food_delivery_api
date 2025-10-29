import { User } from "../models/User.js";
import jwt from "jsonwebtoken";

// for checking user on signin
export const checkUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({email});
        
        // to check if user exists
        if (!user) throw new Error("Invalid credentials");

        // to check if password matches
        const isMatch = await user.matchPassword(password);
        if (!isMatch) throw new Error("Invalid credentials");

        // Generate token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        console.log({token});
        res.status(201).json({token});
    } catch (err) {
        res.status(400).json({ message: err.message});
    }
}

// for creating user on signup
export const createUser = async (req, res) => {
    const userData = req.body;
    const { email } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        // to check if user already exists
        if (existingUser) throw new Error("User already exists");

        const user = await User.create(userData);

        // Generate token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        
        res.status(201).json({ token });
    } catch (err) {
        res.status(400).json({message: err.message});
    }

}

// for getting user when in the context of their identity environment
export const currentUser = async (req,res) => {
    const user = await User.findById(req.user.id).select("-password"); // exclude password
    res.status(200).json(user);
}

// for getting favorite dishes of specific user
export const userFavorites = async (req, res) => {
  const { dishId } = req.body;

  try {
    // Get user (without password)
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if dish is already in favorites
    let favorites = user.favorites.includes(dishId) ? user.favorites.filter((liked) => liked != dishId) : [...user.favorites, dishId];

    // Update user favorites
    user.favorites = favorites;
    await user.save();

    // Respond with updated favorites
    res.status(200).json({ favorites: user.favorites });
    
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
