// Cravely / Server / routes / cartRoutes.js
import express from "express";
import {
  cartAdd,
  cartClear,
  cartDeleteItem,
  cartGet,
  cartUpdateItem,
} from "../controllers/cartController.js";
import authMiddleware from "../middlewares/auth.js";

const cartRouter = express.Router();

cartRouter.get("/cart-get", authMiddleware, cartGet);
cartRouter.post("/cart-add", authMiddleware, cartAdd);
cartRouter.put("/cart-update-item/:id", authMiddleware, cartUpdateItem);
cartRouter.delete("/cart-delete-item/:id", authMiddleware, cartDeleteItem);
cartRouter.delete("/cart-clear", authMiddleware, cartClear);

export default cartRouter;
