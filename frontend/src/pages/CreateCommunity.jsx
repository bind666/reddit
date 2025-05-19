import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateCommunity = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                'http://localhost:5000/api/communities',
                { name, description },
                { withCredentials: true }
            );
            navigate('/communities');
        } catch (err) {
            setError(err.response?.data?.error || 'Creation failed');
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-4">Create Community</h2>
            {error && <p className="text-red-600 mb-2">{error}</p>}
            <form onSubmit={handleCreate}>
                <input
                    type="text"
                    placeholder="Community Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full border p-2 mb-2 rounded"
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border p-2 mb-2 rounded"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Create
                </button>
            </form>
        </div>
    );
};

export default CreateCommunity;
