import { useEffect, useState } from 'react';
import axios from 'axios';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/user/profile', {
                    withCredentials: true,
                });
                setUser(res.data.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch profile');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading)
        return (
            <p className="text-center mt-20 text-gray-500 text-lg font-semibold animate-pulse">
                Loading...
            </p>
        );
    if (error)
        return (
            <p className="text-red-600 text-center mt-20 font-bold text-lg bg-red-100 p-4 rounded">
                {error}
            </p>
        );

    // Get the first letter of the username in uppercase
    const avatarLetter = user?.username?.charAt(0).toUpperCase();

    return (
        <div className="max-w-md mx-auto mt-16 p-10 bg-white rounded-3xl shadow-2xl border border-gray-200">
            <h2 className="text-4xl font-extrabold mb-8 border-b border-gray-300 pb-4 text-gray-900 tracking-wide">
                Profile
            </h2>
            <div className="flex flex-col items-center space-y-8 text-gray-800 text-xl">
                {/* Avatar Circle */}
                <div className="flex items-center justify-center w-24 h-24 rounded-full bg-orange-400 text-white text-5xl font-bold select-none shadow-lg">
                    {avatarLetter}
                </div>
                {/* User Details */}
                <div className="w-full space-y-6">
                    <div className="flex items-center space-x-4">
                        <span className="font-semibold w-32">Username:</span>
                        <span className="truncate">{user.username}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="font-semibold w-32">Email:</span>
                        <span className="truncate">{user.email}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
