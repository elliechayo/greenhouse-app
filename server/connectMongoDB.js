const mongoose = require("mongoose");

// Get .env file
require("dotenv").config();

// Connect to MongoDB
async function connectToMongoDB() {
    try {
      await mongoose.connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      
      return true
    } catch (error) {
      return false
    }
  }
  
const isSuccessfully = connectToMongoDB()

module.exports = isSuccessfully