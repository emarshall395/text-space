// src/routes/messageRoutes.ts
import * as express from 'express';
import {
  getAllMessages,
  createMessage,
  getMessageById,
  updateMessage,
  deleteMessage,
  getMessagesBySenderAndReceiver,
  getMessagesForReceiver
} from '../controllers/messageController';

class MessageRoutes {
  public router: express.Router;

  constructor() {
    this.router = express.Router();
    this.routes();
  }

  // Define API endpoints
  private routes(): void {
    this.router.get('/', getAllMessages); // Get all messages
    this.router.post('/', createMessage); // Create a new message
    this.router.get('/:id', getMessageById); // Get a specific message by ID
    this.router.put('/:id', updateMessage); // Update a message by ID
    this.router.delete('/:id', deleteMessage); // Delete a message by ID
    this.router.get('/sender/:senderID/receiver/:receiverID', getMessagesBySenderAndReceiver); // Get messages by sender and receiver
    this.router.get('/receiver/:receiverID', getMessagesForReceiver); // Get messages for a specific receiver
  }
}

const messageRoutes = new MessageRoutes();
export default messageRoutes.router;
