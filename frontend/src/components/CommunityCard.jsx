import React from 'react';
import { Link } from 'react-router-dom';

const CommunityCard = ({ community }) => {
    return (
        <div className="p-4 border rounded shadow mb-4 bg-white">
            <h3 className="text-lg font-bold">{community.name}</h3>
            <p className="text-gray-600">{community.description}</p>
            <Link
                to={`/communities/${community._id}`}
                className="text-blue-600 hover:underline text-sm mt-2 inline-block"
            >
                View Posts
            </Link>
        </div>
    );
};

export default CommunityCard;
