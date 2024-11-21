import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Admin", "Viewer"],
      default: "Viewer",
    },
    bio: {
      type: String,
      default: "",
      trim: true,
    },
    profileImg: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
