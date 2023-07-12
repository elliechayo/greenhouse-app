require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;

const mongoose = require("mongoose");
const Product = require("./models/Product");

const connectDB = require("./config/db");
connectDB(MONGO_URI);

const products = [
  {
    name: "Test Product 1",
    category: "category-1",
    description: "This is a test product",
    longDescription: "This is a test product",
    price: "23.75",
    image: "test.jpg",
    stockQuantity: 2,
  },
  {
    name: "Test Product 2",
    category: "category-2",
    description: "This is a test product",
    longDescription: "This is a test product",
    price: "23.75",
    image: "test.jpg",
    stockQuantity: 2,
  },
  {
    name: "Test Product 3",
    category: "category-3",
    description: "This is a test product",
    longDescription: "This is a test product",
    price: "23.75",
    image: "test.jpg",
    stockQuantity: 2,
  },
  {
    name: "Test Product 4",
    category: "category-4",
    description: "This is a test product",
    longDescription: "This is a test product",
    price: "23.75",
    image: "test.jpg",
    stockQuantity: 2,
  },
  {
    name: "Test Product 5",
    category: "category-1",
    description: "This is a test product",
    longDescription: "This is a test product",
    price: "23.75",
    image: "test.jpg",
    stockQuantity: 2,
  },
  {
    name: "Test Product 6",
    category: "category-2",
    description: "This is a test product",
    longDescription: "This is a test product",
    price: "23.75",
    image: "test.jpg",
    stockQuantity: 2,
  },
  {
    name: "Test Product 7",
    category: "category-3",
    description: "This is a test product",
    longDescription: "This is a test product",
    price: "23.75",
    image: "test.jpg",
    stockQuantity: 2,
  },
  {
    name: "Test Product 8",
    category: "category-4",
    description: "This is a test product",
    longDescription: "This is a test product",
    price: "23.75",
    image: "test.jpg",
    stockQuantity: 2,
  },
  {
    name: "Test Product 9",
    category: "category-1",
    description: "This is a test product",
    longDescription: "This is a test product",
    price: "23.75",
    image: "test.jpg",
    stockQuantity: 2,
  },
];

async function seedProducts() {
  Product.insertMany(products)
    .then(() => {
      console.log("Products seeded");
      mongoose.disconnect();
      process.exit(0);
    })
    .catch((err) => console.error(err));
}

seedProducts();
