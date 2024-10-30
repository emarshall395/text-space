
// src/server.ts
import * as dotenv from 'dotenv';
import connectDB from './dbConnect';
import app from './App';

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
