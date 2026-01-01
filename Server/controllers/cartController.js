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

/* -------- Add to Cart -------- */
export const addToCart = asyncHandler(async (req, res) => {
  try {
    const { itemId, quantity } = req.body;

    if (!itemId || typeof quantity !== "number") {
      return res.status(400).json({
        success: false,
        message: "ItemId and quantity are required",
      });
    }

    let cartItem = await CartItem.findOne({
      user: req.user._id,
      item: itemId,
    });

    if (cartItem) {
      cartItem.quantity = Math.max(1, cartItem.quantity + quantity);

      if (cartItem.quantity < 1) {
        await cartItem.remove();
        return res.status(200).json({
          success: true,
          message: "Item removed from cart",
          item: {
            _id: cartItem._id.toString(),
            item: cartItem.item,
            quantity: 0,
          },
        });
      }

      await cartItem.save();
      await cartItem.populate("item");

      return res.status(200).json({
        success: true,
        message: "Cart updated successfully!",
        item: {
          _id: cartItem._id.toString(),
          item: cartItem.item,
          quantity: cartItem.quantity,
        },
      });
    }

    cartItem = await CartItem.create({
      user: req.user._id,
      item: itemId,
      quantity,
    });

    await cartItem.populate("item");

    return res.status(201).json({
      success: true,
      message: "Item added to cart successfully!",
      item: {
        _id: cartItem._id.toString(),
        item: cartItem.item,
        quantity: cartItem.quantity,
      },
    });
  } catch (error) {
    console.error("Add to Cart Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to add item to cart",
      error: `Add to Cart Error: ${error.message}`,
    });
  }
});
