// The purpose of this file is to set up and configure the Express application by enabling 
// middleware (such as CORS and JSON parsing). Additinally, it defines the route structure for the 
// application.
// src/App.ts
import express from 'express';
import cors from 'cors';
import messageRoutes from './routes/messageRoutes';

const app = express();

// Enable CORS for all origins (for Postman testing)
app.use(cors());

// Middleware configuration
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/messages', messageRoutes);

export default app;
