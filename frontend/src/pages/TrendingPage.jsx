import { useEffect, useState } from 'react';
import axios from 'axios';

const TrendingPage = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchTrending = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/posts');
                setPosts(res.data.reverse());
            } catch (err) {
                console.error("Error fetching trending posts:", err);
            }
        };
        fetchTrending();
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Trending Posts</h1>
            {posts.length === 0 ? (
                <p>No posts found.</p>
            ) : (
                posts.map(post => (
                    <div key={post._id} className="bg-white shadow p-4 mb-4 rounded">
                        <h2 className="text-xl font-semibold">{post.title}</h2>
                        <p className="text-gray-700 mt-2">{post.content}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default TrendingPage;
