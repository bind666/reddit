import mongoose from 'mongoose';

// postSchema.js

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    mimetype: {
        type: String,
        enum: ["image", "video"],
        default: "image"
    },
    votes: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            value: { // 1 for upvote, -1 for downvote
                type: Number,
                enum: [1, -1],
                required: true
            }
        }
    ]
}, { timestamps: true });

export default mongoose.model('Post', postSchema);
