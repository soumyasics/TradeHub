const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { connectDB } = require("./db/connectDb");
const PORT = 4033;
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Trade hub home route is working." });
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server running on http://localhost:" + PORT);
  });
});
