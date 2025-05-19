import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SidebarLayout = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.delete("http://localhost:5000/api/user/logout", { withCredentials: true });
            navigate("/login");
        } catch (err) {
            console.error("Logout error:", err);
        }
    };

    return (
        <div className="flex min-h-screen">
            <aside className="w-64 bg-gray-900 text-white p-6 flex flex-col space-y-6 shadow-lg sticky top-0 h-screen">
                <div className="flex items-center tracking-wide border-b border-gray-700">
                    <img
                        src="https://static-00.iconduck.com/assets.00/reddit-logo-icon-2048x2048-vtzhwa71.png"
                        alt="Reddit Logo"
                        className="w-9 h-9 mb-3 object-contain bg-orange-600"
                    />
                    <h2 className="text-2xl font-extrabold pb-2 w-full text-center">
                        Reddit Clone
                    </h2>
                </div>

                <nav className="flex flex-col space-y-3 text-lg flex-grow">
                    <NavLink
                        to="/posts"
                        className={({ isActive }) =>
                            `block px-3 py-2 rounded-md transition-colors ${isActive ? "bg-orange-400 text-gray-900 font-semibold" : "hover:text-orange-300"
                            }`
                        }
                    >
                        Posts
                    </NavLink>
                    <NavLink
                        to="/communities"
                        className={({ isActive }) =>
                            `block px-3 py-2 rounded-md transition-colors ${isActive ? "bg-orange-400 text-gray-900 font-semibold" : "hover:text-orange-300"
                            }`
                        }
                    >
                        Communities
                    </NavLink>
                    <NavLink
                        to="/trending"
                        className={({ isActive }) =>
                            `block px-3 py-2 rounded-md transition-colors ${isActive ? "bg-orange-400 text-gray-900 font-semibold" : "hover:text-orange-300"
                            }`
                        }
                    >
                        Trending
                    </NavLink>
                    <NavLink
                        to="/profile"
                        className={({ isActive }) =>
                            `block px-3 py-2 rounded-md transition-colors ${isActive ? "bg-orange-400 text-gray-900 font-semibold" : "hover:text-orange-300"
                            }`
                        }
                    >
                        Profile
                    </NavLink>

                </nav>

                <button
                    onClick={handleLogout}
                    className="mt-auto w-full px-3 py-2 rounded-md border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors font-semibold"
                >
                    Logout
                </button>
            </aside>

            <main className="flex-1 p-8 bg-gray-50 min-h-screen">
                <Outlet />
            </main>
        </div>
    );
};

export default SidebarLayout;
