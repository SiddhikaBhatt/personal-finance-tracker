import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import authRoutes from './routes/auth.routes.js';

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

app.use('/api/auth', authRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

export default app;
