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
        
        res.status(201).json({token});
    } catch (err) {
        res.status(400).json({ message: err.message});
    }
}

// for creating user on signup
export const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        // to check if user already exists
        if (existingUser) throw new Error("User already exists");

        const user = await User.create({ name, email, password });

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

// for updating user favorites 
export const userFavorites = async (req,res) => {
    const { favorite } = req.body;
    try {
        const users = await User.findByIdAndUpdate({ favorite });
        res.status(204).json({message: err.message});
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}