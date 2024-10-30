// src/server.ts
import express from 'express';
import mongoose from 'mongoose';
import messageRoutes from './routes/messageRoutes';
 
const app = express();
const PORT = process.env.PORT || 5000;
 
// Middleware
app.use(express.json());
 
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/your_db_name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 
// Use message routes
app.use('/api/messages', messageRoutes);
 
// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
 
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
