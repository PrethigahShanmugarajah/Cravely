// Cravely / Server / controllers / itemController.js
import itemModel from "../models/itemModel.js";

/* -------- Item Create -------- */
export const itemCreate = async (req, res) => {
  try {
    const { name, description, category, price, rating, hearts } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";

    const total = Number(price) * 1;

    const newItem = new itemModel({
      name,
      description,
      category,
      price: Number(price),
      rating: Number(rating),
      hearts: Number(hearts),
      imageUrl,
      total: Number(total),
    });

    const item = await newItem.save();

    return res
      .status(201)
      .json({ success: true, message: "Item created successfully!", item });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Item name already exists" });
    }

    console.error("Item Create Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to create item",
      error: `Item Create Error: ${error.message}`,
    });
  }
};

/* -------- Item Get All -------- */
export const itemGetAll = async (req, res) => {
  try {
    const items = await itemModel.find().sort({ createdAt: -1 });
    const host = `${req.protocol}://${req.get("host")}`;

    // const withFullUrl = itemModel.applyTimestamps((i) => ({
    //   ...i.toObject(),
    //   imageUrl: i.imageUrl ? host + i.imageUrl : "",
    // }));
    const withFullUrl = items.map((i) => ({
      ...i.toObject(),
      imageUrl: i.imageUrl ? host + i.imageUrl : "",
    }));

    return res.status(200).json({
      success: true,
      message:
        withFullUrl.length === 0
          ? "No items available"
          : "Items fetched successfully!",
      items: withFullUrl,
    });
  } catch (error) {
    console.error("Item Get All Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch items",
      error: `Item Get All Error: ${error.message}`,
    });
  }
};

/* -------- Item Delete -------- */
export const itemDelete = async (req, res) => {
  try {
    const removed = await itemModel.findByIdAndDelete(req.params.id);
    if (!removed) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Item deleted successfully!",
      item: removed,
    });
  } catch (error) {
    console.error("Item Delete Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to delete item",
      error: `Item Delete Error: ${error.message}`,
    });
  }
};
