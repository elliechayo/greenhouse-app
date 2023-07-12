require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;

const mongoose = require("mongoose");
const Product = require("./models/Product");

const connectDB = require("./config/db");
connectDB(MONGO_URI);

const products = [
  {
    name: "Test Product 1",
    category: "Maple Trees",
    description: "This is a test product",
    longDescription: "This is a test product",
    price: "20.75",
    image: "test.jpg",
    stockQuantity: 2,
    rating: 4,
    createdBy: "64ae90333a01a66f5f2e8411"
  },
  {
    name: "Test Product 2",
    category: "Shrub Trees",
    description: "This is a test product",
    longDescription: "This is a test product",
    price: "75.65",
    image: "test.jpg",
    stockQuantity: 2,
    rating: 3,
    createdBy: "64ae90333a01a66f5f2e8411"
  },
  {
    name: "Test Product 3",
    category: "Fruit Trees",
    description: "This is a test product",
    longDescription: "This is a test product",
    price: "23.75",
    image: "test.jpg",
    stockQuantity: 2,
    rating: 5,
    createdBy: "64ae90333a01a66f5f2e8411"
  },
  {
    name: "Test Product 4",
    category: "Cedar Tree",
    description: "This is a test product",
    longDescription: "This is a test product",
    price: "23.75",
    image: "test.jpg",
    stockQuantity: 2,
    rating: 4,
    createdBy: "64ae90333a01a66f5f2e8411"
  },
  {
    name: "Test Product 5",
    category: "Cedar Tree",
    description: "This is a test product",
    longDescription: "This is a test product",
    price: "23.75",
    image: "test.jpg",
    stockQuantity: 2,
    rating: 2,
    createdBy: "64ae90333a01a66f5f2e8411"
  },
  {
    name: "Test Product 6",
    category: "Maple Trees",
    description: "This is a test product",
    longDescription: "This is a test product",
    price: "100.55",
    image: "test.jpg",
    stockQuantity: 2,
    rating: 5,
    createdBy: "64ae90333a01a66f5f2e8411"
  },
  {
    name: "Test Product 7",
    category: "Fruit Trees",
    description: "This is a test product",
    longDescription: "This is a test product",
    price: "15.99",
    image: "test.jpg",
    stockQuantity: 2,
    rating: 3,
    createdBy: "64ae90333a01a66f5f2e8411"
  },
  {
    name: "Test Product 8",
    category: "Maple Trees",
    description: "This is a test product",
    longDescription: "This is a test product",
    price: "23.75",
    image: "test.jpg",
    stockQuantity: 2,
  },
  {
    name: "Test Product 9",
    category: "Shrub Trees",
    description: "This is a test product",
    longDescription: "This is a test product",
    price: "23.75",
    image: "test.jpg",
    stockQuantity: 2,
    rating: 4,
    createdBy: "64ae90333a01a66f5f2e8411"
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
