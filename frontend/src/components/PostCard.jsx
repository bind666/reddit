import React from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import Comments from "./Comments"; // adjust path if needed

const PostCard = ({ post, onVote }) => {
  return (
    <div className="mb-6 p-4 border rounded bg-white shadow">
      <h3 className="text-xl font-semibold">{post.title}</h3>
      <p className="text-gray-700 mb-2">{post.content}</p>

      {post.mimetype === "image" ? (
        <img src={post.image} alt={post.title} className="max-w-full h-auto rounded mb-2" />
      ) : (
        <video src={post.image} controls className="max-w-full rounded mb-2" />
      )}

      <div className="flex items-center gap-4 my-2">
        <button onClick={() => onVote(post._id, 1)} className="text-green-600 hover:text-green-800">
          <ThumbsUp size={20} />
        </button>
        <span className="font-semibold">{post.voteScore || 0}</span>
        <button onClick={() => onVote(post._id, -1)} className="text-red-600 hover:text-red-800">
          <ThumbsDown size={20} />
        </button>
      </div>

      <p className="text-sm text-gray-500">Author: {post.author?.username || "Unknown"}</p>

      {/* Comments section */}
      <Comments postId={post._id} />
    </div>
  );
};

export default PostCard;
