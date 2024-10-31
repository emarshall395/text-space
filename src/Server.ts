// src/server.ts
import messageApp from './routes/messageRoutes';
import * as dotenv from 'dotenv';
import connectDB from './dbConnect';
import express from 'express';

dotenv.config();

const serverApp = express();
const PORT = process.env.PORT || 5025;

// Middleware
serverApp.use(express.json());

connectDB();


// Register routes
serverApp.use('/api/messages', messageApp);


// Define a route for the root path
serverApp.get('/', (req, res) => {
  res.send('Welcome to the Messages API! Use /api/messages to get messages.');
});

// Start the server
serverApp.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default serverApp;

