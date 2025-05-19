import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:5000/api/user/register', formData);
      navigate('/login');
    } catch (err) {
      if (err.response?.status === 422 && err.response.data.message === "User already exists") {
        setError("User already exists. Please login or use a different email.");
      } else {
        setError(err.response?.data?.message || 'Registration failed');
      }
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://www.reuters.com/resizer/v2/OWDSSHTDQNMM3OSQTRXPCVK4UU.jpg?auth=f6ae2a840058870d7940038e88b0da5ff6f105b720b2ddd0bd4e737ca90f563d&width=4000&quality=80')",
      }}
    >
      <form 
        onSubmit={handleSubmit} 
        className="bg-white bg-opacity-90 p-6 rounded shadow-md w-80 space-y-4"
      >
        <h2 className="text-xl font-bold text-gray-900">Register</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded w-full">
          Register
        </button>
        <p className="text-sm text-center text-gray-700">
          Already have an account? <Link to="/login" className="text-green-600 underline">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
