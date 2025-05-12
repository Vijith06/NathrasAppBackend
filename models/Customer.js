// models/Customer.js

const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  address: { type: String, required: true }, // Address field
});

const customerSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // Customer ID
  addresses: [addressSchema], // Array of addresses
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
