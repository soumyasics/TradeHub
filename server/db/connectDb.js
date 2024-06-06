const mongoose = require("mongoose");
const connectDB = async (req, res) => {
  try {
    await mongoose.connect("mongodb://localhost:27017/tradehub");
    console.log("Database connected successfully. ")
  } catch (err) {
    console.log("Error on connect DB", err);
  }
};

module.exports = { connectDB };
