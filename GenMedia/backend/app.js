const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());

//API fetching the all products
app.get("/api/products", (req, res) => {
  axios
    .get("https://dummyjson.com/products")
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "An error occurred while fetching data." });
    });
});

//API fetching a single product to select particular category
app.get("/api/categories", (req, res) => {
  axios
    .get("https://dummyjson.com/products/categories")
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.error("Error fetching categories:", error);
      res
        .status(500)
        .json({ error: "An error occurred while fetching categories." });
    });
});

// API fectching the products based on the category
app.get("/api/products/category/:category", (req, res) => {
  const category = req.params.category; // Extract the category from the route parameter

  axios
    .get(`https://dummyjson.com/products/category/${category}`)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.error("Error fetching products by category:", error);
      res
        .status(500)
        .json({
          error: "An error occurred while fetching products by category.",
        });
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
