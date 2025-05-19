// src/components/PrivateRoute.jsx
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const PrivateRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null); // null = loading, true/false = auth status

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Call your profile API to verify token & auth status
        await axios.get('http://localhost:5000/api/user/profile', { withCredentials: true });
        setIsAuth(true);
      } catch {
        setIsAuth(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuth === null) {
    // While loading auth status, show loading spinner or nothing
    return <div>Loading...</div>;
  }

  if (!isAuth) {
    // If not authenticated, redirect to login
    return <Navigate to="/auth/login" replace />;
  }

  // If authenticated, render children components
  return children;
};

export default PrivateRoute;
