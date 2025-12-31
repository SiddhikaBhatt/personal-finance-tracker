import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());

app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

export default app;
