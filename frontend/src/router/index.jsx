import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import SidebarLayout from '../layouts/SidebarLayout';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import PostsPage from '../pages/PostsPage';
import CommunitiesPage from '../pages/CommunityList';
import CreateCommunity from '../pages/CreateCommunity';
import ProfilePage from '../pages/ProfilePage';
import ProtectedRoute from '../components/ProtectedRoute';
import TrendingPage from '../pages/TrendingPage'; // ✅ Import TrendingPage

const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/posts" />,
    },
    {
        path: '/',
        element: (
            <ProtectedRoute>
                <SidebarLayout />
            </ProtectedRoute>
        ),
        children: [
            { path: '/posts', element: <PostsPage /> },
            { path: '/communities', element: <CommunitiesPage /> },
            { path: '/communities/create', element: <CreateCommunity /> },
            { path: '/profile', element: <ProfilePage /> },
            { path: '/trending', element: <TrendingPage /> }, // ✅ Added Trending route
        ],
    },
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/auth/login',
        element: <LoginPage />,
    },
    {
        path: '/register',
        element: <RegisterPage />,
    },
    {
        path: '/auth/register',
        element: <RegisterPage />,
    },
]);

export default router;
