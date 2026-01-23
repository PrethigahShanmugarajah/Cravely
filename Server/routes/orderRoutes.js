// Cravely / Server / routes / orderRoutes.js
import express from "express";
import authMiddleware from "../middlewares/auth.js";
import { orderCreate } from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/order-create", authMiddleware, orderCreate);

export default orderRouter;
