// src/routes/messageRoutes.ts
import express, { Request, Response, Router } from 'express';
import bodyParser from 'body-parser';
import connectDB from '../dbConnect'; // Import the connection module
import {
  getAllMessages,
  getMessageById,
  updateMessage,
  deleteMessage,
  getMessagesBySenderAndReceiver,
  getMessagesForReceiver,
} from '../controllers/messageController';

// Initialize Express application and router
const messageApp = express();
const router = Router();

// Connect to MongoDB
connectDB(); // Call the connection function here

// Middleware configuration 
messageApp.use(bodyParser.json());
messageApp.use(bodyParser.urlencoded({ extended: false }));

// CORS setup
messageApp.use((req: Request, res: Response, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Existing routes...

messageApp.use('/api/messages', router);

export default messageApp;
