import React, { useState } from 'react';
import axios from 'axios';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!title || !content || !image) {
            setError('Please fill in all fields and upload an image or video.');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('image', image);

        try {
            const res = await axios.post('http://localhost:5000/api/posts', formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setSuccess('Post created successfully!');
            setTitle('');
            setContent('');
            setImage(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Error creating post');
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-4">Create Post</h2>
            {error && <p className="text-red-600 mb-2">{error}</p>}
            {success && <p className="text-green-600 mb-2">{success}</p>}
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="w-full p-2 mb-3 border rounded"
                    required
                />
                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    className="w-full p-2 mb-3 border rounded"
                    rows={4}
                    required
                />
                <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={e => setImage(e.target.files[0])}
                    className="mb-4"
                    required
                />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Create Post
                </button>
            </form>
        </div>
    );
};

export default CreatePost;
