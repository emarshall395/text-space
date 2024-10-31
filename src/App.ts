// App.ts
// Holds the main application logic;
// This file sets up the express application and middleware and
// routes for sending messages

// sets up imports for express, cors modules and imports 
// message-related routes from messageRoutes
import express from 'express';
import cors from 'cors';
import messageRoutes from './routes/messageRoutes';

// initializes express app instance
const app = express();

// enables CORS for routes to allow requests (important for postman testing)
app.use(cors());

// configures middleware to utilize JSON and URL data in requests
app.use(express.json()); // parses JSON payloads
app.use(express.urlencoded({ extended: false })); // parses URL data

// sets the route for message-related API calls
app.use('/api/messages', messageRoutes);

// exports app for use in other files
export default app;
