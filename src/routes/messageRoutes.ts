// src/routes/messageRoutes.ts
import express from 'express';
import {
  getAllMessages,
  createMessage,
  getMessageById,
  updateMessage,
  deleteMessage,
} from '../controllers/messageController';
 
const router = express.Router();
 
router.get('/messages', getAllMessages);
router.post('/messages', createMessage);
router.get('/messages/:id', getMessageById);
router.put('/messages/:id', updateMessage);
router.patch('/messages/:id', updateMessage); // Partial update
router.delete('/messages/:id', deleteMessage);
 
export default router;
