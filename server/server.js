import express from 'express';
import products from './data/Products.js';

const app = express();

// LOAD PRODUCT FROM SERVER
app.get("/api/products", (req, res) => {
  res.json(products);
})

// LOAD SIMPLE PRODUCT FROM SERVER
app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
})

app.get("/", (req, res) => {
  res.send("API is running...");
})

app.listen(5000, console.log("Server running in http://localhost:5000"));