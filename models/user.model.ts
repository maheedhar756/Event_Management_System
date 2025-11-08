import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username : { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minLength: 6 },
  bio: { type: String, default: "" }
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model("User", userSchema);