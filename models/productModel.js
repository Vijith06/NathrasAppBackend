// models/productModel.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: Number,
  discountedPrice: Number,
  images: [String],
  sizes: [String],
  categories: [String],
  contact: String,
  upi: String,
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
