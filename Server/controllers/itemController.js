// Cravely / Server / controllers / itemController.js
import itemModel from "../models/itemModel.js";

/* -------- Create Item -------- */
export const createItem = async (req, res) => {
  try {
    const { name, description, category, price, rating, hearts } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";

    const total = Number(price) * 1;

    const newItem = new itemModel({
      name,
      description,
      category,
      price,
      rating,
      hearts,
      imageUrl,
      total,
    });

    const item = await newItem.save();

    return res
      .status(201)
      .json({ success: true, message: "Item created successfully!", item });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Item name already exists" });
    }

    console.error("Create Item Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to Create Item",
      error: `Create Item Error: ${error.message}`,
    });
  }
};

/* -------- Get All Items -------- */
export const getItems = async (req, res) => {
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
      message: "Items fetched successfully!",
      items: withFullUrl,
    });
  } catch (error) {
    console.error("Get All Items Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to Get Items",
      error: `Get All Items Error: ${error.message}`,
    });
  }
};

/* -------- Delete Item -------- */
export const deleteItem = async (req, res) => {
  try {
    const removed = await itemModel.findByIdAndDelete(req.params.id);
    if (!removed) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }
    return res
      .status(200)
      .json({
        success: true,
        message: "Item deleted successfully!",
        item: removed,
      });
  } catch (error) {
    console.error("Delete Item Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to Delete Item",
      error: `Delete Item Error: ${error.message}`,
    });
  }
};
