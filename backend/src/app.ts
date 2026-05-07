import 'dotenv/config';
import dotenv from 'dotenv';
dotenv.config({ path: './env/.env' });

import express, { Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import { connectDB } from './database/database';
import errorHandler from './middleware/error.middleware';

import authRoutes from './route/auth.route';
import profileRoutes from './route/profile.route';
import farmerRoutes from './route/farmer.route';
import inputRoutes from './route/input.route';
import distributionRoutes from './route/distribution.route';
import officerRoutes from './route/officer.route';

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

connectDB().catch((err) => {
    console.error('DB connection failed:', err.message);
});

app.get('/health', (_req: Request, res: Response) =>
    res.status(200).json({ status: 'ok', service: 'project_ab-api' })
);

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/farmers', farmerRoutes);
app.use('/inputs', inputRoutes);
app.use('/distributions', distributionRoutes);
app.use('/officers', officerRoutes);

app.use((_req: Request, res: Response) =>
    res.status(404).json({ success: false, message: 'Route not found' })
);

app.use(errorHandler);

const PORT = Number(process.env.PORT) || 8000;
const HOST = process.env.IP_ADDRESS || '0.0.0.0';
app.listen(PORT, '0.0.0.0', () => {
    console.log(`API running on http://${HOST}:${PORT}`);
});
