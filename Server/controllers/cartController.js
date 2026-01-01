// Cravely / Server / controllers / cartController.js
import asyncHandler from "express-async-handler";
import { CartItem } from "../models/cartModel.js";

/* -------- Get Cart -------- */
export const getCart = asyncHandler(async (req, res) => {
  try {
    const items = await CartItem.find({ user: req.user._id }).populate("item");

    const cartItems = items.map((ci) => ({
      _id: ci._id.toString(),
      item: ci.item,
      quantity: ci.quantity,
    }));

    return res.status(200).json({
      success: true,
      message: "Cart fetched successfully!",
      cartItems,
    });
  } catch (error) {
    console.error("Get Cart Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to Get Cart",
      error: `Get Cart Error: ${error.message}`,
    });
  }
});
