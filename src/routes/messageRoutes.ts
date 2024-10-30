// src/routes/messageRoutes.ts
import { Router } from 'express';
import {
  getAllMessages,
  createMessage,
  getMessageById,
  updateMessage,
  deleteMessage,
  getMessagesBySenderAndReceiver,
  getMessagesForReceiver
} from '../controllers/messageController';
 
const router = Router();
 
router.get('/', getAllMessages); // Get all messages
router.post('/', createMessage); // Create a new message
router.get('/:id', getMessageById); // Get a specific message by ID
router.put('/:id', updateMessage); // Update a message by ID
router.delete('/:id', deleteMessage); // Delete a message by ID
router.get('/sender/:senderID/receiver/:receiverID', getMessagesBySenderAndReceiver); // Get messages by sender and receiver
router.get('/receiver/:receiverID', getMessagesForReceiver); // Get messages for a specific receiver
 
export default router;
