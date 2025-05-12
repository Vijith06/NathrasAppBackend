const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

exports.signup = async (req, res) => {
  const { mobile, password } = req.body;

  try {
    const existingUser = await User.findOne({ mobile });

    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      mobile,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ success: false, message: 'Signup failed' });
  }
};




