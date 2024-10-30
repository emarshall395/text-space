// src/models/Message.ts
import mongoose, { Document, Schema } from 'mongoose';
 
export interface IMessage extends Document {
  senderID: string;
  receiverID: string;
  content: string;
  createdAt: Date;
}
 
const messageSchema: Schema = new Schema({
  senderID: { type: String, required: true },
  receiverID: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
 
export default mongoose.model<IMessage>('Message', messageSchema);
