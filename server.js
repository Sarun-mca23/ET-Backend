// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./route/auth');
const userRoutes = require('./route/user');
const expenseRoutes = require('./route/expenseRoutes');

const app = express();

// === MIDDLEWARE ===
app.use(cors({
  origin: 'http://localhost:3000',  // Adjust for frontend URL
  methods: ['GET', 'POST'],
  credentials: true,
}));
app.use(express.json());

// === ROUTES ===
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/expenses', expenseRoutes);


// === DB + SERVER START ===
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Database connected successfully');
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running at http://localhost:${process.env.PORT}`);
    });
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));
