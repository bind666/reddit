import express from 'express';
import { auth } from '../middleware/authMiddleware.js';
import { createPost, getPosts, voteOnPost, deletePost } from '../controllers/postController.js';

const router = express.Router();

router.post('/', auth, createPost); // Create a post
router.get('/', auth, getPosts); // Get posts
router.delete('/:id', auth, deletePost);
router.put('/:postId/vote', auth, voteOnPost);


export default router;
