import express, { type Application, type Request, type Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';


dotenv.config();

const app: Application = express();

// Middleware
app.use(cors({
  origin: [process.env.FRONTEND_URL || 'http://localhost:3000'],
  credentials: true
}));

app.use(express.json());

// Database Connection
const MONGO_URI = process.env.MONGO_URI || '';
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Routes

app.use('/api/auth', authRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('TypeScript API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));