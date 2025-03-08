const mongoose = require("mongoose");
require("dotenv").config(); // Ensure dotenv is loaded

const connectDB = async () => {
  try {
    console.log("MONGO_URI from .env:", process.env.MONGO_URI); // Debugging

    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing in .env file");
    }

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit on failure
  }
};

module.exports = connectDB;
