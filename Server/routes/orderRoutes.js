// Cravely / Server / routes / orderRoutes.js
import express from "express";
import authMiddleware from "../middlewares/auth.js";
import {
  orderConfirmPayment,
  orderCreate,
  ordersGet,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/order-create", authMiddleware, orderCreate);
orderRouter.get("/order-confirm-payment", authMiddleware, orderConfirmPayment);
orderRouter.get("/orders-get", authMiddleware, ordersGet);

export default orderRouter;
