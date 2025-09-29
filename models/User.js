import mongoose from "mongoose";
import bcrypt from "bcrypt";

//Schema and model for User
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  address: { type: String },
  role: { type: String, enum: ["customer", "admin", "restaurant"], default: "customer" },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Dish" }],
}, { timestamps: true, minimize: false });

// Hash password before saving (middleware example, not implemented here for brevity)
userSchema.pre("save", async function(next) {
  // Hashing logic would go here
  if (!this.isModified("password")) return next(); // only hash if password is new or modified
    
  const salt = await bcrypt.genSalt(10); // generate salt (string added to password before hashing for security)
  this.password = await bcrypt.hash(this.password, salt); // hash the password (password + salt being hashed)

  next();
});

// Method to compare entered password with hashed password
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}

export const User = mongoose.model("User", userSchema);

