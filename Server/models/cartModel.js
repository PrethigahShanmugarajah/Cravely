// Cravely / Server / models / cartModel.js
import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },
    quanity: {
      type: Number,
      default: 1,
      min: 1,
    },
  },
  { timestamps: true }
);

export const CartItem = mongoose.model("CartItem", cartItemSchema);
