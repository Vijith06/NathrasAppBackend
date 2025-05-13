const Order = require('../models/order');

exports.placeOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    console.error('Order placement error:', error);
    res.status(500).json({ message: 'Failed to place order' });
  }
};

// At the top or wherever your controller is
exports.getOrdersByCustomer = async (req, res) => {
  const { customerId } = req.params;  // Use req.params instead of req.query

  if (!customerId) {
    return res.status(400).json({ message: 'Customer ID is required' });
  }

  try {
    const orders = await Order.find({ customerId });
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find(); // Fetch all orders from the database
    res.status(200).json(orders); // Return the orders as a JSON array
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};



