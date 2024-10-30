// src/routes/messageRoutes.ts
import express, { Request, Response, Router } from 'express';
import bodyParser from 'body-parser';
import connectDB from '../dbConnect';
import {
  getAllMessages,
  createMessage,
  getMessageBySenderAndId,
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
messageApp.use((req: Request, res: Response, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Create a new message route
router.post('/', createMessage); // Use controller function for message creation

// Get all messages
router.get('/', getAllMessages); // Use controller function to get all messages

// Get message by senderID and messageID
router.get('/sender/:senderID/message/:messageID', async (req: Request, res: Response) => {
  const { senderID, messageID } = req.params;

  try {
    const message = await getMessageBySenderAndId(req, res); // Call your controller function
    if (!message) {
      return res.status(404).json({ error: 'Message not found.' });
    }
    res.status(200).json(message);
  } catch (error) {
    console.error('Error fetching message:', error);
    res.status(500).json({ error: 'Failed to fetch message.' });
  }
});

// Update message by senderID, receiverID, and messageID
router.put('/sender/:senderID/receiver/:receiverID/message/:messageID', async (req: Request, res: Response) => {
  const { senderID, receiverID, messageID } = req.params;
  const { content } = req.body;

  try {
    const updatedMessage = await updateMessage({ senderID, receiverID, messageID }, { content }); // Call your controller function
    if (!updatedMessage) {
      return res.status(404).json({ error: 'Message not found.' });
    }
    res.status(200).json(updatedMessage);
  } catch (error) {
    console.error('Error updating message:', error);
    res.status(500).json({ error: 'Failed to update message.' });
  }
});

// Delete message by senderID, receiverID, and messageID
router.delete('/sender/:senderID/receiver/:receiverID/message/:messageID', async (req: Request, res: Response) => {
  const { senderID, receiverID, messageID } = req.params;

  try {
    const result = await deleteMessage({ senderID, receiverID, messageID }); // Call your controller function
    if (!result) {
      return res.status(404).json({ error: 'Message not found.' });
    }
    res.status(204).send(); // No content response for successful delete
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ error: 'Failed to delete message.' });
  }
});

// Get messages by sender and receiver
router.get('/sender/:senderID/receiver/:receiverID', getMessagesBySenderAndReceiver); // Use controller function to get messages by sender and receiver

// Get messages for a specific receiver
router.get('/receiver/:receiverID', getMessagesForReceiver); // Use controller function to get messages for a specific receiver

messageApp.use('/api/messages', router);

export default messageApp;

