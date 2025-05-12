const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

// 🔥 Login function
exports.login = async (req, res) => {
  const { mobile, password } = req.body;

  try {
    const user = await User.findOne({ mobile });

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid Credentials mobile not registered' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid Credentials' });
    }

    res.json({
      success: true,
      message: 'Welcome Home 🎉',
      user: {
          id: user._id, // MongoDB ID or use any other unique identifier
          name: user.name
      }
  });  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
