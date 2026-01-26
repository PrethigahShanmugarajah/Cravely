import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: String, required: true },
    rating: { type: String, default: 0 },
    hearts: { type: String, default: 0 },
    total: { type: String, default: 0 },
    imageUrl: { type: String },
  },
  { timestamps: true },
);

const itemModel = mongoose.models.item || mongoose.model("Item", itemSchema);

export default itemModel;
