import { Link, Outlet, useLocation } from "react-router-dom";
import logout from "../utils/logout";

export default function RootLayout() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col p-4">
        <h2 className="text-2xl font-bold mb-8">MyApp</h2>
        <nav className="flex flex-col gap-4">
          <Link
            to="/dashboard"
            className={`px-4 py-2 rounded ${isActive("/dashboard") ? "bg-gray-700" : ""}`}
          >
            🏠 Posts
          </Link>
          <Link
            to="/community"
            className={`px-4 py-2 rounded ${isActive("/community") ? "bg-gray-700" : ""}`}
          >
            🧑‍🤝‍🧑 Community
          </Link>
          <Link
            to="/profile"
            className={`px-4 py-2 rounded ${isActive("/profile") ? "bg-gray-700" : ""}`}
          >
            🙍 Profile
          </Link>
          <button
            onClick={logout}
            className="px-4 py-2 mt-auto bg-red-500 text-white rounded hover:bg-red-600"
          >
            🔓 Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
