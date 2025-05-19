import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CommunityCard from '../components/CommunityCard';

const CommunityList = () => {
  const [communities, setCommunities] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchCommunities = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/communities', {
        withCredentials: true,
      });
      setCommunities(res.data);
    } catch (err) {
      setError('Failed to fetch communities');
    }
  };

  useEffect(() => {
    fetchCommunities();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Communities</h2>
        <button
          onClick={() => navigate('/communities/create')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Create Community
        </button>
      </div>

      {error && <p className="text-red-600">{error}</p>}
      {communities.length === 0 ? (
        <p>No communities found.</p>
      ) : (
        communities.map((community) => (
          <CommunityCard key={community._id} community={community} />
        ))
      )}
    </div>
  );
};

export default CommunityList;
