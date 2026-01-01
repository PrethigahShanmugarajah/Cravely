// Cravely / Server / routes / cartRoutes.js
import express from "express";
import { getCart } from "../controllers/cartController.js";
import authMiddleware from "../middlewares/auth.js";

const cartRouter = express.Router();

cartRouter.get("/get", authMiddleware, getCart);

export default cartRouter;
