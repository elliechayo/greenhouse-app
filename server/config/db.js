const mongoose = require("mongoose");

const connectDB = async (URI) => {
  try {
    const conn = await mongoose.connect(URI);

    console.log(`Mongoose connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
