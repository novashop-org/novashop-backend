const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: String,
  name: String,
  price: Number,
  stock: Number,
  image: String,
  sizes: [String]
});

module.exports = mongoose.model('Product', productSchema, 'Products');
