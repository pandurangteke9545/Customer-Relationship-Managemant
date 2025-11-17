import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const Login3D = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ email: "", password: "" });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const result = await dispatch(loginUser(form));
    if (result.meta.requestStatus === "fulfilled") {
      localStorage.setItem("token", result.payload.token)
      navigate("/");
    }
  }

  return (
    <div className="h-screen flex items-center bg-gradient-to-br from-gray-200 to-black ">

      {/* 🔵 3D Background */}
      <Canvas className="absolute inset-0">
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <mesh rotation={[20, 20, 20]}>
          <boxGeometry args={[3, 3, 3]} />
          <meshStandardMaterial color="#3b82f6" metalness={0.8} roughness={0.2} />
        </mesh>
        <OrbitControls enableZoom={false} />
      </Canvas>

      {/* 🔵 Login Card */}
      <form
        onSubmit={handleSubmit}
        className="relative bg-white/10 backdrop-blur-lg p-8 mr-10 rounded-2xl shadow-lg w-180 border border-white/20"
      >
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Login
        </h2>

        <input
          type="email"
          name="email"
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-white/20 text-white placeholder-gray-300"
          placeholder="Enter Email"
          required
        />

        <input
          type="password"
          name="password"
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-white/20 text-white placeholder-gray-300"
          placeholder="Enter Password"
          required
        />

        {error && (
          <p className="text-red-400 text-sm mb-3 text-center">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login3D;
