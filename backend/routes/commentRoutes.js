import express from 'express';
import { createComment, getComments } from '../controllers/commentController.js';
import { auth } from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/',auth,  createComment);
router.get('/:postId',auth, getComments);

export default router;
