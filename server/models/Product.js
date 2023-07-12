const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    longDescription: {
      type: String,
    },
    image: {
      type: String,
    },
    stockQuantity: {
      type: Number,
      default: 1,
    },
    price: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
