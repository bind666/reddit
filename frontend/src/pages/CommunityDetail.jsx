// src/pages/CommunityDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Spin, List, Button } from 'antd';
import axios from 'axios';
import PostCard from '../components/PostCard'; // reuse your post card component

const { Title, Paragraph } = Typography;

const CommunityDetail = () => {
  const { id } = useParams();
  const [community, setCommunity] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommunityData = async () => {
      try {
        const communityRes = await axios.get(`/api/communities/${id}`);
        setCommunity(communityRes.data);
        const postsRes = await axios.get(`/api/posts/community/${id}`);
        setPosts(postsRes.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchCommunityData();
  }, [id]);

  if (loading) return <Spin size="large" />;

  if (!community) return <div>Community not found</div>;

  return (
    <div style={{ padding: 24 }}>
      <Title>{community.name}</Title>
      <Paragraph>{community.description || 'No description provided.'}</Paragraph>

      {/* Join/Leave button can be added here */}

      <Title level={3}>Posts</Title>
      {posts.length === 0 && <div>No posts yet.</div>}
      <List
        dataSource={posts}
        renderItem={post => <PostCard key={post._id} post={post} />}
      />
    </div>
  );
};

export default CommunityDetail;
