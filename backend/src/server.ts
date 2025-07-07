import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pool } from './db';
import authRoutes from './routes/auth.routes';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// basic check route
app.get('/', async (_req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(`TrustVote API working! ⏰ Server Time: ${result.rows[0].now}`);
  } catch (err) {
    res.status(500).send('Database connection error');
  }
});

// Routes
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
