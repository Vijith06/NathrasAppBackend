const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/orders', orderController.placeOrder);
router.get('/orders', orderController.getAllOrders); // New route to get orders
router.get('/orders', orderController.getOrdersByCustomer); // support GET /orders?customerId=xyz


module.exports = router;
