// src/routes/messageRoutes.ts
import { Router, Request, Response } from 'express';
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

// Initialize the router
const router = Router();

// Connect to MongoDB
connectDB();

// Get all messages
router.get('/', async (req: Request, res: Response) => {
  try {
    await getAllMessages(req, res); // Call the controller function to get all messages
  } catch (error) {
    console.error('Error fetching all messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages.' });
  }
});

// Create a new message
router.post('/', async (req: Request, res: Response) => {
  try {
    await createMessage(req, res); // Call the controller function to create a new message
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(500).json({ error: 'Failed to create message.' });
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

export default router;

