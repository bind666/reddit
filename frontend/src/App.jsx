import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostDetail from "./pages/PostDetail";
import Community from "./pages/Community";
import ProtectedRoute from "./utils/protectedRoute";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/post/:postId" element={<PostDetail />} />
        <Route path="/r/:communityId" element={<Community />} />

        <Route
          path="/protected"
          element={
            <ProtectedRoute>
              <h1 className="text-center text-2xl mt-10">Protected Content</h1>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
