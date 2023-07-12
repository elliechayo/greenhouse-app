const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    socialTitle: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    billingAddress: {
      type: String,
      default: "",
    },
    shippingAddress: {
      type: String,
      default: "",
    },
    cart: [],
    wishList: [],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
