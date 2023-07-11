const mongoose = require("mongoose");

const Product = require("./model/ProductModel");

require("dotenv").config();

const DB = process.env.DATABASE;
console.log(DB);
let connectDB = async () => {
  await mongoose
    .connect(DB)
    .then((con) => console.log("DB Connection Successfully"));
};

// Read Json File
const products = [
  {
    userId: "64ac13d395c72318bce0f3b6",
    name: "Plant1",
    category: "New Arrivals",
    description: "Amazing Plant",
    longDescription: "With nice features",
    price: "23.50",
    image: "test.jpg",
  },
  {
    userId: "64ac13d395c72318bce0f3b6",
    name: "Plant1",
    category: "New Arrivals",
    description: "Amazing Plant",
    longDescription: "With nice features",
    price: "23.50",
    image: "test.jpg",
  },
  {
    userId: "64ac13d395c72318bce0f3b6",
    name: "Plant1",
    category: "New Arrivals",
    description: "Amazing Plant",
    longDescription: "With nice features",
    price: "23.50",
    image: "test.jpg",
  },
  {
    userId: "64ac13d395c72318bce0f3b6",
    name: "Plant1",
    category: "New Arrivals",
    description: "Amazing Plant",
    longDescription: "With nice features",
    price: "23.50",
    image: "test.jpg",
  },
  {
    userId: "64ac13d395c72318bce0f3b6",
    name: "Plant1",
    category: "New Arrivals",
    description: "Amazing Plant",
    longDescription: "With nice features",
    price: "23.50",
    image: "test.jpg",
  },
];

// Import Data Into DB
const importData = async () => {
  try {
    await connectDB();
    await Product.create(products);
    console.log("Data Successfully loaded");
  } catch (err) {
    console.log(err);
  }
  process.exit(0);
};

importData();
