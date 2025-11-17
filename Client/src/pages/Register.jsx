import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "Manager", 
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(registerUser(formData));

    if (res.meta.requestStatus === "fulfilled") {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black p-6">
      <div className="w-full max-w-md bg-gray-800/40 border border-gray-700 p-8 rounded-3xl shadow-[0_0_25px_rgba(0,0,0,0.6)] transform transition-all hover:scale-[1.02]">
        <h2 className="text-3xl text-white font-bold text-center mb-6 drop-shadow-lg">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Username */}
          <div>
            <label className="text-gray-300">Username</label>
            <input
              type="text"
              name="username"
              className="w-full mt-1 p-3 rounded-xl bg-gray-900 text-white border border-gray-700 focus:border-blue-400 focus:ring focus:ring-blue-600/40 transition"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              className="w-full mt-1 p-3 rounded-xl bg-gray-900 text-white border border-gray-700 focus:border-blue-400 focus:ring focus:ring-blue-600/40 transition"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              className="w-full mt-1 p-3 rounded-xl bg-gray-900 text-white border border-gray-700 focus:border-blue-400 focus:ring focus:ring-blue-600/40 transition"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
            />
          </div>

          {/* Role Dropdown */}
          <div>
            <label className="text-gray-300">Role</label>
            <select
              name="role"
              className="w-full mt-1 p-3 rounded-xl bg-gray-900 text-white border border-gray-700 focus:border-blue-400 focus:ring focus:ring-blue-600/40 transition"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="Manager">Manager</option>
              <option value="SalesExecutive">Sales Executive</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-xl text-white font-semibold shadow-[0_5px_20px_rgba(0,112,244,0.5)] transition transform hover:-translate-y-1"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default Register;
