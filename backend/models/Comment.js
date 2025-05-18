import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: String,
    parentComment: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: null }
}, { timestamps: true });

export default mongoose.model('Comment', commentSchema);
