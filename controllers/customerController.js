// controllers/customerController.js

const Customer = require('../models/Customer');

// Get customer details including all addresses
exports.getCustomer = async (req, res) => {
  try {
    const customer = await Customer.findOne({ id: req.params.id });
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.json(customer); // Returns all customer details including addresses
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch customer' });
  }
};

// Add a new address to the customer
exports.addAddress = async (req, res) => {
  try {
    const { address } = req.body;

    const customer = await Customer.findOne({ id: req.params.id });
    if (!customer) {
      console.log('Customer not found'); // Log customer not found
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Add new address to the addresses array
    customer.addresses.push({ address });
    await customer.save();

    res.status(201).json({ message: 'Address added', customer });
  } catch (error) {
    console.log('Error saving address:', error); // Log error details
    res.status(500).json({ message: 'Failed to add address' });
  }
};

// Update an existing address
exports.updateAddress = async (req, res) => {
  try {
    const { address, addressId } = req.body; // Assuming you're passing addressId to identify the address
    const customer = await Customer.findOne({ id: req.params.id });

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Find the address by its ID and update it
    const addressToUpdate = customer.addresses.id(addressId);
    if (!addressToUpdate) {
      return res.status(404).json({ message: 'Address not found' });
    }

    addressToUpdate.address = address; // Update the address field
    await customer.save();

    res.json({ message: 'Address updated', customer });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update address' });
  }
};

// Delete an address
exports.deleteAddress = async (req, res) => {
  try {
    const { id, addressId } = req.params; // Get the customerId and addressId from the URL
    console.log('Received addressId to delete:', addressId); // Log the received addressId

    // Find the customer by their ID
    const customer = await Customer.findOne({ id: id });
    console.log('Customer found:', customer); // Log customer details

    if (!customer) {
      console.log('Customer not found');
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Find the index of the address with the matching addressId
    const addressIndex = customer.addresses.findIndex(address => address._id.toString() === addressId);
    console.log('Address index:', addressIndex); // Log the index of the address to delete

    if (addressIndex === -1) {
      console.log('Address not found in customer\'s address list');
      return res.status(404).json({ message: 'Address not found' });
    }

    // Remove the address from the array
    customer.addresses.splice(addressIndex, 1);
    console.log('Updated customer addresses:', customer.addresses); // Log the updated address list

    // Save the customer document after modifying the addresses
    await customer.save();
    console.log('Customer saved after address deletion');

    res.json({ message: 'Address deleted', customer });
  } catch (error) {
    console.error('Error occurred while deleting address:', error); // Log the error if something goes wrong
    res.status(500).json({ message: 'Failed to delete address' });
  }
};
