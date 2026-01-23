// Cravely / Server / routes / orderRoutes.js
import express from "express";
import authMiddleware from "../middlewares/auth.js";
import { createOrder } from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/create", authMiddleware, createOrder);

export default orderRouter;
