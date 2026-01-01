// Cravely / Server / controllers / cartController.js
import { CartItem } from "../models/cartModel.js";

/* -------- Get Cart -------- */
export const getCart = async (req, res) => {
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
};

/* -------- Add to Cart -------- */
export const addToCart = async (req, res) => {
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
};

/* -------- Update Cart Item -------- */
export const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;

    const cartItem = await CartItem.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    // cartItem.quantity = Math.max(1, quantity);
    cartItem.quantity = Math.max(1, cartItem.quantity + quantity);

    await cartItem.save();
    await cartItem.populate("item");

    return res.status(200).json({
      success: true,
      message: "Cart item updated successfully!",
      item: {
        _id: cartItem._id.toString(),
        item: cartItem.item,
        quantity: cartItem.quantity,
      },
    });
  } catch (error) {
    console.error("Update Cart Item Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to Update Cart Items",
      error: `Update Cart Items Error: ${error.message}`,
    });
  }
};
