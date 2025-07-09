import express from 'express';
import { createElection } from '../controllers/election.controller';
import { protect as authenticateJWT, adminOnly } from '../middleware/auth.middleware';
import { getElections } from '../controllers/election.controller';

const router = express.Router();

// POST /api/elections/create
router.post('/create', createElection);
router.post('/elections', authenticateJWT, adminOnly, createElection);
router.get('/elections', getElections);

export default router;
