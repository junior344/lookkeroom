import express from 'express';
import authenticateToken from '../middleware/authMiddleware.js';
import {getLobbyMessages, postMessage}  from '../controllers/messageController.js';

const router = express.Router();
router.get('/lobby/:lobbyId', authenticateToken, getLobbyMessages);
router.post('/lobby/:lobbyId', authenticateToken, postMessage);


export default router;