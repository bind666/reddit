import React, { useState } from 'react';
import CreatePost from '../components/CreatePost';
import PostsList from '../components/PostsList';

const PostsPage = () => {
  const [showCreatePost, setShowCreatePost] = useState(false);

  const toggleCreatePost = () => {
    setShowCreatePost(prev => !prev);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <button
        onClick={toggleCreatePost}
        className="mb-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
      >
        {showCreatePost ? 'Close Create Post' : 'Create Post'}
      </button>

      {showCreatePost && (
        <>
          <CreatePost />
          <hr className="my-6" />
        </>
      )}

      <PostsList />
    </div>
  );
};

export default PostsPage;
