const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    products: [
      {
        id: String,
        quantity: String,
      },
    ],
    createdBy: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "On Hold",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", OrderSchema);
