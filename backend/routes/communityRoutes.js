import express from 'express';
import { createCommunity, getAllCommunities } from '../controllers/communityController.js';
import { auth } from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/', auth, createCommunity);
router.get('/', auth, getAllCommunities);

export default router;
