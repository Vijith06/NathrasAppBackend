// controllers/productController.js
const Product = require('../models/productModel');

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products.map(product => ({
      ...product._doc,
      images: product.images.map(img =>
        `data:image/jpeg;base64,${img}` // or image/png depending on your format
      )
    })));
      } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
