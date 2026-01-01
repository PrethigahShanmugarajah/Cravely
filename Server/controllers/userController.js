// Cravely / Server / controllers / userController.js
import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";

/* -------- Create Token -------- */
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

/* -------- User Register -------- */
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const exists = await userModel.findOne({ email });

    if (exists) {
      return res
        .status(409)
        .json({ success: false, message: "User already exists" });
    }

    // Validation
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    // If Everything Works
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // New User
    const newUser = new userModel({
      username: username,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const token = createToken(user._id);

    res.status(201).json({
      success: true,
      token,
      message: "User registered successfully!",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("User Register Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to Register User",
      error: `User Register Error: ${error.message}`,
    });
  }
};

/* -------- User Login -------- */
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = createToken(user._id);
    return res.status(200).json({
      success: true,
      token,
      message: "Login successfully!",
      user: {
        id: user._id,
        username: user.userName ?? user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("User Login Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to Login User",
      error: `User Login Error: ${error.message}`,
    });
  }
};
