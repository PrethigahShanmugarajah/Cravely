// Cravely / Server / controllers / cartController.js
import { CartItem } from "../models/cartModel.js";

/* -------- Cart Get -------- */
export const cartGet = async (req, res) => {
  try {
    const items = await CartItem.find({ user: req.user._id }).populate("item");

    const cartItems = items.map((ci) => ({
      _id: ci._id.toString(),
      item: ci.item,
      quantity: ci.quantity,
    }));

    return res.status(200).json({
      success: true,
      message:
        cartItems.length === 0
          ? "Your cart is empty"
          : "Cart fetched successfully!",
      cartItems,
    });
  } catch (error) {
    console.error("Cart Get Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch cart",
      error: `Cart Get Error: ${error.message}`,
    });
  }
};

/* -------- Cart Add -------- */
export const cartAdd = async (req, res) => {
  try {
    const { itemId, quantity } = req.body;

    // if (!itemId || typeof quantity !== "number") {
    //   return res.status(400).json({
    //     success: false,
    //     message: "ItemId and quantity are required",
    //   });
    // }

    if (!itemId) {
      return res.status(400).json({
        success: false,
        message: "ItemId is required",
      });
    }

    if (typeof quantity !== "number") {
      return res.status(400).json({
        success: false,
        message: "Quantity must be a number",
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
    console.error("Cart Add Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to add item to cart",
      error: `Cart Add Error: ${error.message}`,
    });
  }
};

/* -------- Cart Update Item -------- */
export const cartUpdateItem = async (req, res) => {
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
    console.error("Cart Update Item Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to update cart item",
      error: `Cart Update Item Error: ${error.message}`,
    });
  }
};

/* -------- Cart Delete Item -------- */
export const cartDeleteItem = async (req, res) => {
  try {
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

    await cartItem.deleteOne();

    res.status(200).json({
      success: true,
      message: "Cart item deleted successfully!",
      item: {
        _id: cartItem._id.toString(),
        item: cartItem.item,
        quantity: cartItem.quantity,
      },
    });
  } catch (error) {
    console.error("Cart Delete Item Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to delete cart item",
      error: `Cart Delete Item Error: ${error.message}`,
    });
  }
};

/* -------- Cart Clear -------- */
export const cartClear = async (req, res) => {
  try {
    const cartItems = await CartItem.find({ user: req.user._id });

    if (cartItems.length === 0) {
      return res.status(200).json({
        success: true,
        message: "Your cart is already empty",
      });
    }

    // await CartItem.deleteMany({ user: req.user._id });
    const result = await CartItem.deleteMany({ user: req.user._id });

    return res.status(200).json({
      success: true,
      message: `Cart cleared successfully! ${result.deletedCount} item(s) removed!`,
    });
  } catch (error) {
    console.error("Cart Clear Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to clear cart",
      error: `Cart Clear Error: ${error.message}`,
    });
  }
};
