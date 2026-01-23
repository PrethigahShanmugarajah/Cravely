// Cravely / Server / routes / itemRoutes.js
import express from "express";
import multer from "multer";
import {
  itemCreate,
  itemDelete,
  itemGetAll,
} from "../controllers/itemController.js";
import authMiddleware from "../middlewares/auth.js";

const itemRouter = express.Router();

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, "uploads/"),
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

itemRouter.post("/item-create", upload.single("image"), itemCreate);
itemRouter.get("/item-get-all", itemGetAll);
itemRouter.delete("/item-delete/:id", authMiddleware, itemDelete);

export default itemRouter;
