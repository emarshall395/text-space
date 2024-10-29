// src/controllers/messageController.ts
import { Request, Response } from 'express';
import Message, { IMessage } from '../models/Message';
 
// Get all messages
export const getAllMessages = async (req: Request, res: Response): Promise<void> => {
    try {
        const messages = await Message.find();
        res.status(200).json(messages);
      } catch (err) {
        console.error("Error retrieving messages:", err); // Logs the error to the console
        res.status(500).json({ error: "Failed to retrieve messages." });
      }
};
 
// Create a new message
export const createMessage = async (req: Request, res: Response): Promise<void> => {
    try {
        const newMessage: IMessage = new Message(req.body);
        const savedMessage = await newMessage.save();
        res.status(201).json(savedMessage);
      } catch (err) {
        if (err instanceof Error) {
          // Check if err is an instance of Error to access its message property
          console.error("Error saving message:", err);
          res.status(500).json({ error: err.message });
        } else {
          // Handle unexpected error types
          console.error("Unknown error occurred:", err);
          res.status(500).json({ error: "An unknown error occurred." });
        }
      }
      
};
 
// Get a specific message by ID
export const getMessageById = async (req: Request, res: Response): Promise<void> => {
    try {
        const message = await Message.findById(req.params.id);
        if (message) {
          res.status(200).json(message);
        } else {
          res.status(404).json({ message: 'Message not found' });
        }
      } catch (err) {
        if (err instanceof Error) {
          console.error("Error finding message:", err); // Logs the specific error
          res.status(500).json({ error: err.message });
        } else {
          console.error("Unknown error:", err);
          res.status(500).json({ error: "An unknown error occurred." });
        }
      }

};
 
// Update a message by ID
export const updateMessage = async (req: Request, res: Response): Promise<void> => {
    try {
        const updatedMessage = await Message.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true,
        });
        if (updatedMessage) {
          res.status(200).json(updatedMessage);
        } else {
          res.status(404).json({ message: 'Message not found' });
        }
      } catch (err) {
        if (err instanceof Error) {
          console.error("Error updating message:", err); // Logs the error for debugging
          res.status(500).json({ error: err.message });
        } else {
          console.error("Unknown error:", err); // Logs unknown errors
          res.status(500).json({ error: "An unknown error occurred." });
        }
      }      
};
 
// Delete a message by ID
export const deleteMessage = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedMessage = await Message.findByIdAndDelete(req.params.id);
        if (deletedMessage) {
          res.status(200).json({ message: 'Message deleted' });
        } else {
          res.status(404).json({ message: 'Message not found' });
        }
      } catch (err) {
        if (err instanceof Error) {
          console.error("Error deleting message:", err); // Logs error details
          res.status(500).json({ error: err.message });
        } else {
          console.error("Unknown error:", err); // Logs non-Error instances
          res.status(500).json({ error: "An unknown error occurred." });
        }
      }      
};

