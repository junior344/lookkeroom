import express from 'express';
import authenticateToken from '../middleware/authMiddleware.js';
import {createLobby, addUserToLobby} from '../controllers/lobbyController.js';
//
console.log(authenticateToken);
const router = express.Router();
router.post('/lobby', authenticateToken, createLobby);
router.post('/lobby/:lobbyId/add-user', authenticateToken, addUserToLobby);


export default router;