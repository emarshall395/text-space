
// src/server.ts
import messageApp from './routes/messageRoutes';
import * as dotenv from 'dotenv';
import connectDB from './dbConnect';
import app from './App';

const app = express();

// Middleware
app.use(express.json());

// Register routes
app.use('/api/messages', messageApp);

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
