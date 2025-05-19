import Comment from '../models/Comment.js';

export const createComment = async (req, res) => {
  try {
    const { postId, text, parentId } = req.body; // changed content -> text
    const author = req.user?._id;

    if (!postId || !text || !author) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newComment = new Comment({
      postId,
      author,
      text,
      parentComment: parentId || null,
    });

    await newComment.save();

    const populatedComment = await Comment.findById(newComment._id).populate("author", "username profileImage");

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
    const comments = await Comment.find({ postId }).populate('author', 'username profileImage');
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
};
