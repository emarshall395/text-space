// createDB/createMessage.ts

// Step 1: Connect to the 'admin' database
db = db.getSiblingDB('admin');

// Step 2: Create an admin user with roles for broad permissions
db.createUser({
  user: "dbAdmin",
  pwd: "test",
  roles: [
    { role: "readWriteAnyDatabase", db: "admin" },
    { role: "dbAdminAnyDatabase", db: "admin" },
    { role: "clusterAdmin", db: "admin" }
  ]
});

// Step 3: Switch to 'messagesDB' to define the 'messages' collection
db = db.getSiblingDB('messagesDB');

// Step 4: Create the 'messages' collection if it doesn’t exist
db.createCollection('messages');

// Step 5: Insert a sample message document according to messageSchema
db.messages.insertOne({
  senderID: "user123",
  receiverID: "user456",
  content: "Hello, this is a test message!",
  createdAt: new Date()  // Ensures compliance with messageSchema
});
