import express from "express";
import { registerUser, login, getUserById, updateUser } from "../Controllers/user.js";
import { authenticate, authorize } from "../Middlewares/authmiddleware.js"



export const  userRouter = express.Router()

userRouter.post("/register", registerUser);
userRouter.post("/login", login);
userRouter.get("/user/:id", getUserById);
userRouter.put("/user/:id", updateUser); 

userRouter.get("/admin", authenticate, authorize(["Admin"]), (req, res) => {
  res.status(200).json({ message: "Welcome Admin" });
});
