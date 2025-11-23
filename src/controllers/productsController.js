// src/controllers/productsController.js

const Product = require('../models/Product');

// Fetch all products from the database
exports.listProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// Fetch a single product by id from the database
exports.getProduct = async (req, res) => {
  try {
    const prod = await Product.findOne({ id: req.params.id });
    if (prod) res.json(prod);
    else res.status(404).json({ error: 'Product not found' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};
