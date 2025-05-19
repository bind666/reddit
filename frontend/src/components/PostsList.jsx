import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostCard from '../components/PostCard'; // <-- new import

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');

  const fetchPosts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/posts', {
        withCredentials: true,
      });
      setPosts(res.data.posts);
    } catch (err) {
      setError('Failed to fetch posts');
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleVote = async (postId, value) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/posts/${postId}/vote`,
        { value },
        { withCredentials: true }
      );

      setPosts(prevPosts =>
        prevPosts.map(post =>
          post._id === postId
            ? { ...post, voteScore: res.data.voteScore }
            : post
        )
      );
    } catch (err) {
      console.error('Vote failed:', err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Posts</h2>
      {error && <p className="text-red-600">{error}</p>}
      {posts.length === 0 && <p>No posts found.</p>}
      {posts.map(post => (
        <PostCard key={post._id} post={post} onVote={handleVote} />
      ))}
    </div>
  );
};

export default PostsList;
