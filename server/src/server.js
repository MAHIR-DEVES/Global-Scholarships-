import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import scholarshipRoutes from './routes/scholarshipRoutes.js';

dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/scholarships', scholarshipRoutes);

// test route
app.get('/', (req, res) => {
  res.send('API is working!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler for Express v5
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// For Vercel deployment, we need to export the app
export default app;

// Only start the server if this file is run directly (not imported)
if (import.meta.url === `file://${process.argv[1]}`) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
