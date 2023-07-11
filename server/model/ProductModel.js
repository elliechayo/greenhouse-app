const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {type: String, required: true},
  category: String,
  description: String,
  image: {type: String, required: true},
  stockQuantity: Number,
  longDescription: String,
  price: String,
  rating: Number,
  userId: String

});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
