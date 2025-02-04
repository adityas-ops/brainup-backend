import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
  },
  {
    timestamps: true,
  }
);

// Use mongoose.model() instead of Model
const User = mongoose.model("User", UserSchema);

export default User;
