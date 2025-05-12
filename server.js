const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

const otpRoutes = require('./routes/otpRoutes');
const userRoutes = require('./routes/userRoutes');
const loginRoutes = require('./routes/loginRoutes');  // ✅ Separate login route
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/OrderRoutes');
const customerRoutes = require('./routes/customerRoutes');
const reviewRoutes = require('./routes/reviewRoutes');





dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: '*',           // OR replace with your frontend IP: http://192.168.39.196:3000
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use('/uploads', express.static('uploads'));


// Connect to MongoDB
connectDB();

// Routes
app.use('/api', otpRoutes);
app.use('/api', userRoutes);
app.use('/api', loginRoutes);
app.use('/api/products', productRoutes);
app.use('/api', orderRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api', reviewRoutes);





const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

