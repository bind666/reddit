import express from 'express';
import { auth } from '../middleware/authMiddleware.js';
import { createPost, getPosts, voteOnPost, deletePost } from '../controllers/postController.js';

const router = express.Router();

// Keep auth middleware, but if you want to test without auth, you can comment it out temporarily
router.post('/', auth, createPost); // Create a post
router.get('/', auth, getPosts); // Get posts
router.delete('/:id', auth, deletePost);
router.put('/:postId/vote', auth, voteOnPost);

export default router;
