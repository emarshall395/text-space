// src/server.ts)

import express from 'express';
import mongoose from 'mongoose';
import messageRoutes from './routes/messageRoutes'; 

const PORT = process.env.PORT || 5000;
const app = express();

// Connect to MongoDB (ensure you have the correct connection string)
const mongoURI = 'mongodb://localhost:27017/messagesDB'; // Adjust as needed
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware configuration
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/messages', messageRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
