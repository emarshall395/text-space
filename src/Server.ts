// Start the Express server that will listen for incoming HTTP 
// requests and route them to the appropriate controllers and database operations
// src/server.ts

// sets up imports for express, cors modules, and imports 
// message-related routes from messageRoutes
import messageApp from './routes/messageRoutes';
import * as dotenv from 'dotenv';
import connectDB from './dbConnect';
import express from 'express';

dotenv.config();

// initializes express app instance
const serverApp = express();
const PORT = process.env.PORT || 5025;

// enables for routes to allow requests (important for postman testing)
serverApp.use(express.json());

connectDB();


// Register routes to allow requests
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

