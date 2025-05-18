import { useState } from "react";
import axios from "../utils/axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
    const [form, setForm] = useState({ username: "", email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError(""); // clear error on input change
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/user/register", form);
            navigate("/auth/login");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4">
            <h2 className="text-xl font-semibold mb-4">Register</h2>
            {error && <p className="text-red-500 mb-2">{error}</p>}

            <input
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Username"
                className="mb-2 w-full p-2 border"
                required
            />

            <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="mb-2 w-full p-2 border"
                required
            />

            <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                className="mb-2 w-full p-2 border"
                required
            />

            <button type="submit" className="w-full bg-green-600 text-white p-2">
                Register
            </button>

            <p className="text-sm mt-3">
                Already have an account?{" "}
                <Link to="/auth/login" className="text-blue-600 underline">
                    Login
                </Link>
            </p>
        </form>
    );
};

export default Register;
