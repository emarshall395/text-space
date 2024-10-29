// src/server.ts
import express, { Application } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import messageRoutes from './routes/messageRoutes';
 
dotenv.config();
 
const app: Application = express();
 
// Middleware
app.use(express.json());
 
// Routes
app.use('/api', messageRoutes);
 
// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


