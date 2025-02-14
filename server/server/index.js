import 'dotenv/config'; // No need for .config()
import express from 'express';
import cors from 'cors';

const app = express();
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Allows JSON body parsing

// Sample API Route
app.get('/', (req, res) => {
  console.log("Attempting to hit root path")
  res.json({ message: 'Welcome to Galvadia Server!!' });
});
app.get('/api', (req, res) => {
  console.log("Attempting to hit /api")
  res.json({ message: 'Server is working!' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
