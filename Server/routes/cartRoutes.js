// Cravely / Server / routes / cartRoutes.js
import express from "express";
import {
  addToCart,
  deleteCartItem,
  getCart,
  updateCartItem,
} from "../controllers/cartController.js";
import authMiddleware from "../middlewares/auth.js";

const cartRouter = express.Router();

cartRouter.get("/get", authMiddleware, getCart);
cartRouter.post("/add", authMiddleware, addToCart);
cartRouter.put("/update/:id", authMiddleware, updateCartItem);
cartRouter.delete("/delete/:id", authMiddleware, deleteCartItem);

export default cartRouter;
