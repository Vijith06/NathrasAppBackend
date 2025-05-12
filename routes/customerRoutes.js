// routes/customerRoutes.js

const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

// Get customer by ID
router.get('/:id', customerController.getCustomer);

// Add a new address
router.post('/:id/addresses', customerController.addAddress);

// Update an address
router.put('/:id/addresses', customerController.updateAddress);

// Delete an address
router.delete('/:id/addresses/:addressId', customerController.deleteAddress);

module.exports = router;
