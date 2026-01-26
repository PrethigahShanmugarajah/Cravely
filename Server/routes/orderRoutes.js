import express from "express";
import authMiddleware from "../middlewares/auth.js";
import {
  orderAdminGetAll,
  orderConfirmPayment,
  orderCreate,
  orderGetById,
  ordersGet,
  orderUpdateAnyByAdmin,
  orderUpdateById,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/order-create", authMiddleware, orderCreate);
orderRouter.get("/order-confirm-payment", authMiddleware, orderConfirmPayment);
orderRouter.get("/order-get", authMiddleware, ordersGet);
orderRouter.get("/order-admin-get-all", orderAdminGetAll);
orderRouter.put("/order-update-any-by-admin/:id", orderUpdateAnyByAdmin);
orderRouter.get("/order-get-by-id/:id", authMiddleware, orderGetById);
orderRouter.put("/order-update-by-id/:id", authMiddleware, orderUpdateById);

export default orderRouter;
