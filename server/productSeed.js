import ProductImage1 from "../assets/products/product2.jpg";

require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;

const mongoose = require("mongoose");
const Product = require("./models/Product");

const connectDB = require("./config/db");
connectDB(MONGO_URI);

const products = [
  {
    name: "Philodendron3",
    category: "category-1",
    description: "This is a hybrid, self-heading philodendron.",
    longDescription:
    "This is a hybrid, self-heading philodendron. It has stunning foliage that starts off in brilliant red tones and age into dark greens. Native to the rainforests of South America, it's adaptable and extremely forgiving",
    price: "20.75",
    image:"product2.jpg",
    rating: 5,
    stockQuantity: 2,
  },
  {
    name: "Black Eyed Susan",
    category: "Shrub Trees",
    description:
      "With dark, velvety leaves and contrasting silver veins, this Alocasia will catch the eye of any plant lover. ",
    longDescription: "SM: ~7-10 inch tall and a 4 inch pot",
    price: "75.65",
    image: "test.jpg",
    stockQuantity: 2,
  },
  {
    name: "Test Product 3",
    category: "Fruit Trees",
    description: "This is a test product",
    longDescription: "This is a test product",
    price: "23.75",
    image: "test.jpg",
    stockQuantity: 2,
  },
  {
    name: "Test Product 4",
    category: "Cedar Tree",
    description: "This is a test product",
    longDescription: "This is a test product",
    price: "23.75",
    image: "test.jpg",
    stockQuantity: 2,
  },
  {
    name: "Test Product 5",
    category: "Cedar Tree",
    description: "This is a test product",
    longDescription: "This is a test product",
    price: "23.75",
    image: "test.jpg",
    stockQuantity: 2,
  },
  {
    name: "Test Product 6",
    category: "Maple Trees",
    description: "This is a test product",
    longDescription: "This is a test product",
    price: "100.55",
    image: "test.jpg",
    stockQuantity: 2,
  },
  {
    name: "Test Product 7",
    category: "Fruit Trees",
    description: "This is a test product",
    longDescription: "This is a test product",
    price: "15.99",
    image: "test.jpg",
    stockQuantity: 2,
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
  },
];

async function seedProducts() {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("Database seeded");
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.log(error);
    await mongoose.disconnect();
    process.exit(1);
  }
  mongoose.disconnect();
}

seedProducts();
