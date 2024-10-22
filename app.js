import express from 'express';
import authRoutes from './routes/authRoutes.js';
import lobbyRoutes  from './routes/lobbyRoutes.js';
import messageRoutes from './routes/messageRoutes.js';

const app = express();
app.use(express.json());
app.use('/api', authRoutes);
app.use('/api', lobbyRoutes);
app.use('/api', messageRoutes);


export default app;

