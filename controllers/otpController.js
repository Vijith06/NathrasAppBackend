const twilio = require('twilio');
const dotenv = require('dotenv');

dotenv.config();

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

let otpStore = {};

exports.sendOtp = async (req, res) => {
  const { mobile } = req.body;

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[mobile] = otp;

  try {
    await client.messages.create({
      body: `Your OTP is ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: mobile
    });

    res.status(200).json({ success: true, message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
};

exports.verifyOtp = (req, res) => {
  const { mobile, otp } = req.body;

  if (otpStore[mobile] === otp) {
    delete otpStore[mobile];
    res.status(200).json({ success: true, message: 'OTP verified successfully' });
  } else {
    res.status(400).json({ success: false, message: 'Invalid OTP' });
  }
};
