import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("❌ Passwords do not match");
      return;
    }

    try {
      const response = await registerUser({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      setMessage("✅ " + response.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      if (error.response) {
        setMessage("❌ " + error.response.data.message);
      } else {
        setMessage("❌ Server not responding");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center text-blue-700 mb-2">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Register to access the Textile Waste Management Platform
        </p>

        {message && (
          <div className="mb-4 text-center font-semibold">
            {message}
          </div>
        )}

        <form onSubmit={handleRegister}>

          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Full Name
            </label>

            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full border rounded-lg p-3"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border rounded-lg p-3"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full border rounded-lg p-3"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className="w-full border rounded-lg p-3"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-medium">
              Select Role
            </label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            >
              <option value="">Choose your role</option>
              <option>Recycling Facility Operator</option>
              <option>Sustainability Manager</option>
              <option>Textile Manufacturer</option>
              <option>Administrator</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
          >
            Register
          </button>

        </form>

        <p className="text-center mt-6">
          Already have an account?
          <Link
            to="/login"
            className="text-blue-600 ml-2 hover:underline"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;