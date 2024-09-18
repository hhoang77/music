import mongoose from "mongoose";

const User = mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    image: {
      type: String,
      default: "",
    },
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    phone: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("user", User);
export default UserModel;
