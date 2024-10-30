// src/routes/messageRoutes.ts
import express, { Request, Response, Router } from 'express';
import bodyParser from 'body-parser';
import connectDB from '../dbConnect';
import {
  getAllMessages,
  getMessageById,
  createMessage,
  updateMessage,
  deleteMessage,
  getMessagesBySenderAndReceiver,
  getMessagesForReceiver
} from '../controllers/messageController';
import Message from '../models/Message'; // Import the Message model

// Initialize Express application and router
const router = Router();

// Connect to MongoDB
connectDB();

// Middleware configuration 
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

// CORS setup
router.use((req: Request, res: Response, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Create a new message route
router.post('/', async (req: Request, res: Response) => {
  const { senderID, receiverID, content } = req.body; // Destructure variables from request body

  // Validate input
  if (!senderID || !receiverID || !content) {
    return res.status(400).json({ error: "All fields are required: senderID, receiverID, content." });
  }

  try {
    const newMessage = await createMessage(req); // Call controller function
    res.status(201).json(newMessage); // Respond with created message
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(500).json({ error: 'Failed to create message.' });
  }
});

// Get all messages
router.get('/', async (req: Request, res: Response) => {
  try {
    const messages = await getAllMessages(req, res); // Call controller function
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages.' });
  }
});

// Get message by ID
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const message = await getMessageById(req, res); // Call controller function
    if (!message) {
      return res.status(404).json({ error: 'Message not found.' });
    }
    res.status(200).json(message);
  } catch (error) {
    console.error('Error fetching message:', error);
    res.status(500).json({ error: 'Failed to fetch message.' });
  }
});

// Update message by ID
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { senderID, receiverID, content } = req.body;

  try {
    const updatedMessage = await updateMessage(id, { senderID, receiverID, content }); // Call your controller function
    if (!updatedMessage) {
      return res.status(404).json({ error: 'Message not found.' });
    }
    res.status(200).json(updatedMessage);
  } catch (error) {
    console.error('Error updating message:', error);
    res.status(500).json({ error: 'Failed to update message.' });
  }
});

// Delete message by ID
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await deleteMessage(id); // Call your controller function
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
router.get('/sender/:senderID/receiver/:receiverID', async (req: Request, res: Response) => {
  const { senderID, receiverID } = req.params;

  try {
    const messages = await getMessagesBySenderAndReceiver(req, res); // 
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages by sender and receiver:', error);
    res.status(500).json({ error: 'Failed to fetch messages.' });
  }
});

// Get messages for a specific receiver
router.get('/receiver/:receiverID', async (req: Request, res: Response) => {
  const { receiverID } = req.params;

  try {
    const messages = await getMessagesForReceiver(req, res); // 
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages for receiver:', error);
    res.status(500).json({ error: 'Failed to fetch messages.' });
  }
});

export default router; // Export the router to use in your app

