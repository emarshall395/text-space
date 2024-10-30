// src/models/Message.ts
import mongoose, { Document, Schema } from 'mongoose';
 
export interface IMessage extends Document {
  senderID: string;  // Add senderID field
  receiverID: string;  // Add receiverID field
  content: string;
  timestamp: Date;
}
 
const MessageSchema: Schema = new Schema({
  senderID: { type: String, required: true },  // Ensure senderID is required
  receiverID: { type: String, required: true },  // Ensure receiverID is required
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});
 
export default mongoose.model<IMessage>('Message', MessageSchema);
