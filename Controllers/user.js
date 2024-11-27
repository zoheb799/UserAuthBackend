import User from "../models/user.js";
import jwt from "jsonwebtoken";

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

    const token = jwt.sign({ _id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201)
      .cookie("token", token, {
        expires: new Date(Date.now() + 86400000),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .json({ message: "User registered successfully", token, user: newUser });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
};

 
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

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
    res.status(500).json({ success: false, message: error.message });
  }
};



  export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findById(id).select("-password"); // Exclude the password
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ message: "Error fetching user details", error: error.message });
    }
  };
  

  export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, bio, profileImg } = req.body;
  
    try {
      const user = await User.findById(id);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      if (username) user.username = username;
      if (bio) user.bio = bio;
      if (profileImg) user.profileImg = profileImg;
  
      await user.save();
  
      res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
      res.status(500).json({ message: "Error updating user", error: error.message });
    }
  };
  
  
  
  export const logout = async (req, res) => {
    try {
      res.status(200)
      .cookie("token", "", {
        expires: new Date(0),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .json({ success: true, message: "Logged out successfully" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ success: false, message: "Error logging out" });
    }
  };



  