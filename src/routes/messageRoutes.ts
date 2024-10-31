// src/routes/messageRoutes.ts
import express, { Request, Response, Router } from 'express';
import bodyParser from 'body-parser';
import connectDB from '../dbConnect';
import cors from 'cors';
import {
  getAllMessages,
  getMessageBySenderAndId,
  createMessage,
  updateMessage,
  deleteMessage,
  getMessagesBySenderAndReceiver,
  getMessagesForReceiver
} from '../controllers/messageController';
import Message from '../models/Message'; // Import the Message model

// Initialize Express application and router
const messageApp = express();
const router = Router();

// Connect to MongoDB
connectDB();

// Middleware configuration 
messageApp.use(bodyParser.json());
messageApp.use(bodyParser.urlencoded({ extended: false }));

// CORS setup
messageApp.use(cors()); // Added CORS middleware

// CORS setup
//messageApp.use((req: Request, res: Response, next) => {
 // res.header("Access-Control-Allow-Origin", "*");
 // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 // next();
//});

// Create a new message route
router.post('/', async (req: Request, res: Response) => {
  const { senderID, receiverID, content } = req.body;

  // Validate input
  if (!senderID || !receiverID || !content) {
   res.status(400).json({ error: "All fields are required: senderID, receiverID, content." });
   return;
  }

  try {
    await createMessage(req, res);
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(500).json({ error: 'Failed to create message.' });
  }
});

// Get all messages with senderID and receiverID as query parameters
router.get('/', async (req: Request, res: Response) => {
   try {
    res.status(200).send('Hello World');
  } catch (error) {
    res.status(500).send('Server Error');
  }

  const { senderID, receiverID } = req.query;
  
  // Validate input
  if (!senderID || !receiverID) {
     res.status(400).json({ error: "Both senderID and receiverID are required." });
     return;
  }

  try {
    await getAllMessages(req, res);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages.' });
  }
});

// Get a message by senderID and messageID
router.get('/sender/:senderID/message/:messageID', async (req: Request, res: Response) => {
  try {
    await getMessageBySenderAndId(req, res);
  } catch (error) {
    console.error('Error fetching message by sender and ID:', error);
    res.status(500).json({ error: 'Failed to fetch message.' });
  }
});

// Update message by senderID, receiverID, and messageID
router.put('/sender/:senderID/receiver/:receiverID/message/:messageID', async (req: Request, res: Response) => {
  try {
    await updateMessage(req, res);
  } catch (error) {
    console.error('Error updating message:', error);
    res.status(500).json({ error: 'Failed to update message.' });
  }
});

// Delete message by senderID, receiverID, and messageID
router.delete('/sender/:senderID/receiver/:receiverID/message/:messageID', async (req: Request, res: Response) => {
  try {
    await deleteMessage(req, res);
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ error: 'Failed to delete message.' });
  }
});

// Get messages by sender and receiver
router.get('/sender/:senderID/receiver/:receiverID', async (req: Request, res: Response) => {
  try {
    await getMessagesBySenderAndReceiver(req, res);
  } catch (error) {
    console.error('Error fetching messages by sender and receiver:', error);
    res.status(500).json({ error: 'Failed to fetch messages.' });
  }
});

// Get messages for a specific receiver
router.get('/receiver/:receiverID', async (req: Request, res: Response) => {
  try {
    await getMessagesForReceiver(req, res);
  } catch (error) {
    console.error('Error fetching messages for receiver:', error);
    res.status(500).json({ error: 'Failed to fetch messages for receiver.' });
  }
});

messageApp.use('/api/messages', router);

export default messageApp;


