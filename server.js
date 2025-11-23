require('dotenv').config(); // Load environment variables

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const authenticateToken = require('./src/middleware/authMiddleware');
const productsRouter = require('./src/routes/products');
const cartRouter = require('./src/routes/cart');
const checkoutRouter = require('./src/routes/checkout');
const authRouter = require('./src/routes/auth');

const app = express();
app.use(cors());
app.use(express.json());

// --- Mongoose Connection (Mongoose v7: no options needed) ---
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB connected (Atlas)!'))
  .catch(err => console.log('MongoDB connection error:', err));
// ------------------------------------------------------------

// Register all routers BEFORE calling app.listen
app.use('/products', productsRouter);
app.use('/cart', cartRouter);
app.use('/checkout', checkoutRouter);
app.use('/auth', authRouter); // <-- must be before listen()!

// Protected route
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route!', user: req.user });
});

// Health check route (optional)
app.get('/health', (req, res) => res.status(200).json({ status: 'ok', app: 'NovaShop API' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`NovaShop API running on port ${PORT}`));

module.exports = app;
