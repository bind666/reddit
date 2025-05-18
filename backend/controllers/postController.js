import mongoose from 'mongoose';
import asyncHandler from "express-async-handler";
import createError from "http-errors";
import Post from "../models/Post.js";
import { fileUploader, fileRemover } from "../utils/utils.js"; // fileUploader and fileRemover utilities for Cloudinary

export const createPost = asyncHandler(async (req, res, next) => {
    const { title, content } = req.body;
    const file = req.files?.image; // Assuming the file is sent with the key 'image'

    // Validate input
    if (!title || !content || !file) {
        return next(createError(400, "Title, content, and image are required"));
    }

    // Validate file size and type
    const validMimeType = ["image/jpeg", "image/png", "image/gif", "video/mp4"];
    if (!validMimeType.includes(file.mimetype)) {
        return next(createError(422, "Invalid file type. Only image or video files are allowed"));
    }

    const fileSizeInMB = file.size / (1024 * 1024); // Convert size to MB
    if (fileSizeInMB > 10) {
        return next(createError(400, "File size is too large. Max size is 10MB"));
    }

    // Upload file to Cloudinary
    const uploadedFile = await fileUploader(file);

    // Create the post in the database
    const post = await Post.create({
        title,
        content,
        image: uploadedFile.secure_url, // Save the Cloudinary URL
        author: req.user._id,            // Attach user ID from JWT
        mimetype: file.mimetype.split("/")[0], // image or video
    });

    res.status(201).json({
        success: true,
        message: "Post created successfully",
        post,
    });
});

export const getPosts = asyncHandler(async (req, res, next) => {
    const { authorId } = req.query;

    let posts;
    if (authorId) {
        // Fetch posts by specific user
        posts = await Post.find({ author: authorId }).populate('author', 'name email').sort({ createdAt: -1 });
    } else {
        // Fetch all posts
        posts = await Post.find().populate('author', 'name email').sort({ createdAt: -1 });
    }

    res.status(200).json({
        success: true,
        posts,
    });
});

export const deletePost = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    // Check if the post exists and belongs to the current user
    const post = await Post.findOne({ _id: id, author: req.user._id });
    if (!post) {
        return next(createError(404, "Post not found or you do not have permission to delete it"));
    }

    // Remove the file from Cloudinary (extract the filename key)
    const fileKey = post.image.split("/").pop().split(".")[0];
    const isFileDeleted = await fileRemover(fileKey);

    if (!isFileDeleted) {
        return next(createError(500, "Error deleting file from Cloudinary"));
    }

    // Delete the post from the database
    await post.deleteOne();

    res.status(200).json({
        success: true,
        message: "Post deleted successfully",
    });
});

export const voteOnPost = async (req, res) => {
    try {
        const { postId } = req.params;
        const { userId, value } = req.body;

        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({ error: 'Invalid post ID' });
        }

        if (!userId || ![1, -1].includes(value)) {
            return res.status(400).json({ error: 'Invalid vote data' });
        }

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        const existingVoteIndex = post.votes.findIndex(
            vote => vote.userId.toString() === userId
        );

        if (existingVoteIndex !== -1) {
            if (post.votes[existingVoteIndex].value === value) {
                // Remove vote (toggle off)
                post.votes.splice(existingVoteIndex, 1);
            } else {
                // Change vote direction
                post.votes[existingVoteIndex].value = value;
            }
        } else {
            post.votes.push({ userId, value });
        }

        await post.save();

        const voteScore = post.votes.reduce((sum, vote) => sum + vote.value, 0);

        res.status(200).json({
            message: 'Vote processed',
            voteScore,
            votes: post.votes
        });

    } catch (err) {
        console.error('Vote error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};






