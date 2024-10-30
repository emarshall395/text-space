import express from 'express';
import mongoose from 'mongoose';
import messageRoutes from './routes/messageRoutes'; 
import { App } from './App';

const PORT = process.env.PORT || 5000;
const app = new App().express;


app.use('/api/messages', messageRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
