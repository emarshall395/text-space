// createDB/createSample.ts
 
// Step 1: Switch to the 'toDoSample' database
db = db.getSiblingDB('toDoSample');
 
// --- Messages Collection Setup ---
db.createCollection('messages');
const messagesCollection = db.getCollection('messages');
messagesCollection.remove({}); // Clear any existing documents
 
// Insert sample message documents according to messageSchema
messagesCollection.insertMany([
  {
    senderID: "user123",
    receiverID: "user456",
    content: "Hey, just checking in!",
    createdAt: new Date()  // Follows messageSchema requirement
  },
  {
    senderID: "user456",
    receiverID: "user123",
    content: "Hello! I'm doing well, thanks for asking.",
    createdAt: new Date()
  },
  {
    senderID: "user789",
    receiverID: "user123",
    content: "Are you free to catch up tomorrow?",
    createdAt: new Date()
  }
]);
