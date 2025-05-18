import Comment from '../models/Comment.js';

export const createComment = async (req, res) => {
  try {
    const { postId, content, parentId } = req.body;
    const authorId = req.user?._id;

    // Validate required fields
    if (!postId || !content || !authorId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create a new comment
    const newComment = new Comment({
      postId,
      authorId,
      content,
      parentId: parentId || null, // Set null if not a reply
    });

    await newComment.save();

    // Populate author details
    const populatedComment = await Comment.findById(newComment._id).populate("authorId", "username profileImage");

    return res.status(201).json({
      message: "Comment created successfully",
      comment: populatedComment,
    });
  } catch (error) {
    console.error("Error creating comment:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const getComments = async (req, res) => {
  const { postId } = req.params;
  try {
    const comments = await Comment.find({ postId }).populate('author');
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
};
