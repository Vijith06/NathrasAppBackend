const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  address: { type: String, required: true },
  paymentMode: { type: String, enum: ['upi', 'cod'], required: true },
  customerId: { type: String, required: true },
  size: { type: String, required: true },
  status: { type: String, default: 'pending' },
  orderDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
