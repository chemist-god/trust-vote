import express from 'express';
import { createElection } from '../controllers/election.controller';
import { protect as authenticateJWT, adminOnly } from '../middleware/auth.middleware';
import { getElections } from '../controllers/election.controller';

const router = express.Router();

// POST /api/elections
router.post('/', createElection);

// POST /api/elections (with auth)
router.post('/', authenticateJWT, adminOnly, createElection);

// GET /api/elections
router.get('/', getElections);

export default router;

