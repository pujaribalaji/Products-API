const express=require('express');
const mongoose=require('mongoose');
const db=require('./models/db');
const products=require('./models/products');
const cors=require("cors");
const axios=require("axios");

const app=express();
const port=5000


// API endpoint to fetch and store products
app.get('/api/products', async (req, res) => {
    try {
      const response = await axios.get('https://dummyjson.com/docs/products');
      const products = response.data;
  
      // Store products in your MongoDB database
      await Product.insertMany(products);
  
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });





app.listen(port,()=>{
    console.log(`APP is running AT ${port}`)
});