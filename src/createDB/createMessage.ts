// createDB/createMessage.ts
import mongoose from 'mongoose';
import connectDB from '../dbConnect'; // Import the connection module

// Connect to the 'messagesDB' database
const createMessage = async () => {
  await connectDB(); // Connect to MongoDB

  // Define the Message schema
  const messageSchema = new mongoose.Schema({
    senderID: { type: String, required: true },
    receiverID: { type: String, required: true },
    messageID: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  });

  // Create the Message model
  const Message = mongoose.model('Message', messageSchema);

  try {
    const newMessage = new Message({
      senderID: 'user123',
      receiverID: 'user456',
      messageID: 'msg001', // Use a unique messageID
      content: 'Hello, this is a test message!',
      createdAt: new Date(),
    });

    const savedMessage = await newMessage.save();
    console.log('Message created:', savedMessage);
  } catch (error) {
    console.error('Error creating message:', error);
  } finally {
    mongoose.connection.close(); // Close the connection
  }
};

createMessage();
