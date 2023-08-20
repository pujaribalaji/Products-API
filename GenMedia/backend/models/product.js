const mongoose = require("mongoose");
const db = require("./db");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  image: String,
});

module.exports = mongoose.model("Product", productSchema);
