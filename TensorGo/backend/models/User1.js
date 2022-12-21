import mongoose from "mongoose";

// Defining Schema
const userSchema = new mongoose.Schema({
  userId: { type: String },
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  gender: { type: String, trim: true },
  status: { type: String,  trim: true },
  
}, { timestamps: true });

// Model
const users = mongoose.model("users", userSchema);

export default users;
