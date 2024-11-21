import User from "../models/user.js";
import jwt from "jsonwebtoken";
import { Profile } from "../models/userprofile.js";

export const registerUser = async (req, res) => {
    const { username, email, password, role } = req.body;
    try {

  
      const newUser = new User({
        username,
        email,
        password,
        role: role || "Viewer",
      });
  
      await newUser.save();
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ error: "Registration failed" });
    }
  };
  
 
  export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Invalid email or password",
        });
      }
  
      if (user.password !== password) {
        return res.status(400).json({
          success: false,
          message: "Invalid email or password",
        });
      }
      const token = jwt.sign(
        { _id: user._id, role: user.role }, 
        process.env.JWT_SECRET, // Secret key
        { expiresIn: "1d" } // Token expiry of 1 day
      );
  
      res.status(200)
        .cookie("token", token, {
          expires: new Date(Date.now() + 86400000), 
          httpOnly: true, 
          secure: process.env.NODE_ENV === "production", 
          sameSite: "strict", 
        })
        .json({
          token, 
          user,
          success: true,
          message: "Logged In Successfully",
        });
    } catch (error) {
      console.log(error.message);
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };


  export const Userprofile = async (req, res) => {
    const { username, bio, profileImg } = req.body;
  
    try {
  
const Newprofile = new Profile({
    username,
        bio,
        profileImg,
})
await Newprofile.save();
      res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
      console.error(error);  
      res.status(500).json({ error: 'Profile update failed', message: error.message });
    }
  };
  
  
  
  
