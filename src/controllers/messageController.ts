// src/controllers/messageController.ts
import { Request, Response } from 'express';
import Message, { IMessage } from '../models/Message';

// Get all messages with optional senderID and receiverID
export const getAllMessages = async (req: Request, res: Response): Promise<void> => {
  const { senderID, receiverID } = req.query;

  try {
    const filter: { senderID?: string; receiverID?: string } = {};

    if (senderID) {
      filter.senderID = senderID as string;
    }

    if (receiverID) {
      filter.receiverID = receiverID as string;
    }

    const messages = await Message.find(filter);
    res.status(200).json(messages);
  } catch (err) {
    console.error("Error retrieving messages:", err);
    res.status(500).json({ error: "Failed to retrieve messages." });
  }
};

// Create a new message from sender to receiver
export const createMessage = async (req: Request, res: Response): Promise<void> => {
  const { senderID, receiverID, messageID, content } = req.body;

  // Ensure all required fields are present
  if (!senderID || !receiverID || !content) {
    return res.status(400).json({ error: "All fields are required: senderID, receiverID, content." });
  }

  try {
    const newMessage: IMessage = new Message({ senderID, receiverID, messageID, content });
    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error saving message:", err);
      res.status(500).json({ error: err.message });
    } else {
      console.error("Unknown error occurred:", err);
      res.status(500).json({ error: "An unknown error occurred." });
    }
  }
};

// Get a specific message by senderID and messageID
export const getMessageBySenderAndId = async (req: Request, res: Response): Promise<void> => {
  const { senderID, messageID } = req.params;

  try {
    const message = await Message.findOne({ senderID, messageID });
    if (message) {
      res.status(200).json(message);
    } else {
      res.status(404).json({ message: 'Message not found' });
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error finding message:", err);
      res.status(500).json({ error: err.message });
    } else {
      console.error("Unknown error:", err);
      res.status(500).json({ error: "An unknown error occurred." });
    }
  }
};

// Update a specific message using senderID, receiverID, and messageID
export const updateMessage = async (req: Request, res: Response): Promise<void> => {
  const { senderID, receiverID, messageID } = req.params;
  const { content } = req.body;

  try {
    const updatedMessage = await Message.findOneAndUpdate(
      { senderID, receiverID, messageID },
      { content }, // Only updating the content; modify as needed
      { new: true, runValidators: true }
    );
    if (updatedMessage) {
      res.status(200).json(updatedMessage);
    } else {
      res.status(404).json({ message: 'Message not found' });
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error updating message:", err);
      res.status(500).json({ error: err.message });
    } else {
      console.error("Unknown error:", err);
      res.status(500).json({ error: "An unknown error occurred." });
    }
  }
};

// Delete a specific message using senderID, receiverID, and messageID
export const deleteMessage = async (req: Request, res: Response): Promise<void> => {
  const { senderID, receiverID, messageID } = req.params;

  try {
    const deletedMessage = await Message.findOneAndDelete({ senderID, receiverID, messageID });
    if (deletedMessage) {
      res.status(200).json({ message: 'Message deleted' });
    } else {
      res.status(404).json({ message: 'Message not found' });
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error deleting message:", err);
      res.status(500).json({ error: err.message });
    } else {
      console.error("Unknown error:", err);
      res.status(500).json({ error: "An unknown error occurred." });
    }
  }
};

// Get messages by sender and receiver IDs
export const getMessagesBySenderAndReceiver = async (req: Request, res: Response): Promise<void> => {
  const { senderID, receiverID } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { senderID, receiverID },
        { senderID: receiverID, receiverID: senderID }
      ]
    });

    if (messages.length === 0) {
      return res.status(404).json({ message: 'No messages found for this sender and receiver combination' });
    }

    res.status(200).json(messages);
  } catch (err) {
    console.error("Error retrieving messages:", err);
    res.status(500).json({ error: "Failed to retrieve messages." });
  }
};

// Get messages received by a specific receiver ID
export const getMessagesForReceiver = async (req: Request, res: Response): Promise<void> => {
  const { receiverID } = req.params;

  try {
    const messages = await Message.find({ receiverID });

    if (messages.length === 0) {
      return res.status(404).json({ message: 'No messages found for this receiver' });
    }

    res.status(200).json(messages);
  } catch (err) {
    console.error("Error retrieving messages for receiver:", err);
    res.status(500).json({ error: "Failed to retrieve messages for receiver." });
  }
};

