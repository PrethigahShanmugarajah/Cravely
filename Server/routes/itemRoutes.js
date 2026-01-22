// Cravely / Server / routes / itemRoutes.js
import express from "express";
import multer from "multer";
import {
  createItem,
  deleteItem,
  getItems,
} from "../controllers/itemController.js";
import authMiddleware from "../middlewares/auth.js";

const itemRouter = express.Router();

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, "uploads/"),
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

itemRouter.post("/create", upload.single("image"), authMiddleware, createItem);
itemRouter.get("/get", getItems);
itemRouter.delete("/delete/:id", authMiddleware, deleteItem);

export default itemRouter;
