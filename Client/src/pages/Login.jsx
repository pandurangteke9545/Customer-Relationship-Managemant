// import React, { useState } from "react";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser } from "../redux/slices/authSlice";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// import Register from "./Register";

// const Login = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { loading, error } = useSelector((state) => state.auth);

//   const [form, setForm] = useState({ email: "", password: "" });

//   function handleChange(e) {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();

//     const result = await dispatch(loginUser(form));
//     if (result.meta.requestStatus === "fulfilled") {
//       localStorage.setItem("token", result.payload.token)
//       navigate("/");
//     }
//   }

//   return (
//     <div className="h-screen flex items-center bg-gradient-to-br from-gray-200 to-black ">

//       {/* 🔵 3D Background */}
//       <Canvas className="absolute inset-0">
//         <ambientLight intensity={0.7} />
//         <directionalLight position={[5, 5, 5]} intensity={1.5} />
//         <mesh rotation={[20, 20, 20]}>
//           <boxGeometry args={[3, 3, 3]} />
//           <meshStandardMaterial color="#3b82f6" metalness={0.8} roughness={0.2} />
//         </mesh>
//         <OrbitControls enableZoom={false} />
//       </Canvas>

//       {/* 🔵 Login Card */}
      // <form
      //   onSubmit={handleSubmit}
      //   className="relative bg-white/10 backdrop-blur-lg p-8 mr-10 rounded-2xl shadow-lg w-180 border border-white/20"
      // >
      //   <h2 className="text-3xl font-bold text-white text-center mb-6">
      //     Login
      //   </h2>

      //   <input
      //     type="email"
      //     name="email"
      //     onChange={handleChange}
      //     className="w-full p-3 mb-4 rounded bg-white/20 text-white placeholder-gray-300"
      //     placeholder="Enter Email"
      //     required
      //   />

      //   <input
      //     type="password"
      //     name="password"
      //     onChange={handleChange}
      //     className="w-full p-3 mb-4 rounded bg-white/20 text-white placeholder-gray-300"
      //     placeholder="Enter Password"
      //     required
      //   />

      //   {error && (
      //     <p className="text-red-400 text-sm mb-3 text-center">
      //       {error}
      //     </p>
      //   )}

      //   <button
      //     type="submit"
      //     disabled={loading}
      //     className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg transition"
      //   >
      //     {loading ? "Logging in..." : "Login"}
      //   </button>
      //   <div className="text-center mt-5 text-blue-600 decoration-1">

      //   <Link to={"/register"}>SignUp</Link>
      //   </div>
      // </form>
        
//     </div>
//   );
// };

// export default Login;


import React, { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/slices/authSlice";
import { useNavigate, Link } from "react-router-dom";

const RotatingCube = () => {
  const cubeRef = useRef();

  // 🔵 Slow auto rotation
  useFrame(() => {
    cubeRef.current.rotation.x += 0.003;
    cubeRef.current.rotation.y += 0.003;
  });

  return (
    <mesh ref={cubeRef}>
      <boxGeometry args={[3, 3, 3]} />
      <meshStandardMaterial color="#2563eb" metalness={1} roughness={0.2} />

      {/* 🔵 CRM Name on Each Face */}
      {/* front */}
      <Text
        position={[0, 0, 1.55]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        CRM
      </Text>

      {/* back */}
      <Text
        position={[0, 0, -1.55]}
        rotation={[0, Math.PI, 0]}
        fontSize={0.4}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        CRM
      </Text>

      {/* right */}
      <Text
        position={[1.55, 0, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        fontSize={0.4}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        CRM
      </Text>

      {/* left */}
      <Text
        position={[-1.55, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
        fontSize={0.4}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        CRM
      </Text>

      {/* top */}
      <Text
        position={[0, 1.55, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        fontSize={0.35}
        color="white"
      >
        CRM
      </Text>

      {/* bottom */}
      <Text
        position={[0, -1.55, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.35}
        color="white"
      >
        CRM
      </Text>
    </mesh>
  );
};

const Login = () => {
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
      localStorage.setItem("token", result.payload.token);
      navigate("/");
    }
  }

  return (
    <div className="h-screen flex items-center justify-end relative bg-gradient-to-br from-black via-gray-900 to-gray-800">

      {/* 🌟 3D Background */}
      <Canvas className="absolute inset-0" shadows>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.2} />
        <directionalLight position={[-5, 5, 5]} intensity={1.5} />

        <RotatingCube />

        {/* Allows drag rotation */}
        <OrbitControls enableZoom={false} />
      </Canvas>

      {/* 🌟 Glassmorphic Login Card */}
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
        <p className="text-center text-gray-300 mt-6 text-sm">
          Don't have an account?{" "}
          <Link className="text-blue-400 font-semibold hover:underline" to="/register">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
