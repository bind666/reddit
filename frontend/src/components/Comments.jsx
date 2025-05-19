import React, { useEffect, useState } from "react";
import axios from "axios";

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/comments/${postId}`, { withCredentials: true });
        setComments(res.data || []);
      } catch (err) {
        setError("Failed to load comments");
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      const res = await axios.post(
        "http://localhost:5000/api/comments",
        { withCredentials: true }
      );
      setComments(prev => [...prev, res.data.comment]);
      setNewComment("");
    } catch (err) {
      setError("Failed to add comment");
    }
  };

  if (loading) return <p>Loading comments...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="mt-4 border-t pt-4">
      <h3 className="font-semibold mb-2">Comments ({comments.length})</h3>

      <div className="space-y-3 max-h-48 overflow-y-auto">
        {comments.length === 0 && <p>No comments yet.</p>}
        {comments.map((comment) => (
          <div key={comment._id} className="p-2 bg-gray-100 rounded">
            <p className="text-sm">{comment.text}</p>
            <p className="text-xs text-gray-500 mt-1">By: {comment.author?.username || "Unknown"}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex space-x-2">
        <input
          type="text"
          className="flex-grow border rounded px-2 py-1"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          onClick={handleAddComment}
          className="bg-orange-500 text-white px-4 rounded hover:bg-orange-600"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default Comments;
