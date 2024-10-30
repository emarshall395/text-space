
// src/App.js
const express = require('express');
const cors = require('cors');
const messageRoutes = require('./routes/messageRoutes');

const app = express();

// Enable CORS for all origins (for Postman testing)
app.use(cors());

// Middleware configuration
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/messages', messageRoutes);

module.exports = app;
