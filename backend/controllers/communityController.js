import Community from '../models/Community.js';

export const createCommunity = async (req, res) => {
    const { name, description } = req.body;
    try {
        const community = await Community.create({ name, description, creator: req.user.userId });
        res.status(201).json(community);
    } catch (err) {
        res.status(500).json({ error: 'Community creation failed', details: err.message });
    }
};

export const getAllCommunities = async (req, res) => {
    try {
        const communities = await Community.find();
        res.json(communities);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch communities' });
    }
};
