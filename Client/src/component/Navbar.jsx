import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="
        bg-white/20 backdrop-blur-xl 
        border-b border-white/30
        shadow-lg shadow-blue-500/20
        px-10 py-4 flex justify-between items-center 
        sticky top-0 z-50 rounded-b-2xl
      "
    >
      {/* Logo */}
      <motion.h1
        whileHover={{ rotateY: 10, scale: 1.06 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="text-3xl font-bold text-blue-700 drop-shadow-md cursor-pointer"
      >
        CRM App
      </motion.h1>

      {/* Menu */}
      <ul className="flex gap-8 items-center text-gray-800 font-medium">

        {[ 
          { name: "Home", path: "/" },
          { name: "Leads", path: "/leads" },
          { name: "Activities", path: "/activities" },
        ].map((item) => (
          <motion.li
            key={item.name}
            whileHover={{ scale: 1.15, rotateX: 8, rotateY: -8 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="cursor-pointer"
          >
            <Link
              to={item.path}
              className="hover:text-blue-600 transition-all duration-200 drop-shadow-sm"
            >
              {item.name}
            </Link>
          </motion.li>
        ))}

        {/* Login / Logout Button */}
        <motion.li
          whileHover={{ scale: 1.2 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="cursor-pointer"
        >
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-red-600 font-semibold hover:text-red-800"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="hover:text-blue-600 transition-all duration-200 drop-shadow-sm"
            >
              Login
            </Link>
          )}
        </motion.li>

      </ul>
    </motion.nav>
  );
};

export default Navbar;





// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import { motion } from "framer-motion";

// const Navbar = () => {
//   const location = useLocation();

//   const menuItems = [
//     { name: "Home", path: "/" },
//     { name: "Leads", path: "/leads" },
//     { name: "Activities", path: "/activities" },
//     { name: "Login", path: "/login" },
//   ];

//   return (
//     <motion.nav
//       initial={{ y: -50, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.6, ease: "easeOut" }}
//       className="
//         fixed top-0 left-0 w-full 
//         bg-white/10 backdrop-blur-2xl
//         border-b border-white/20 
//         shadow-[0_5px_20px_rgba(0,0,0,0.2)]
//         px-12 py-4 flex justify-between items-center
//         z-50 
//       "
//     >

//       {/* Logo with Neon Glow */}
//       <motion.h1
//         whileHover={{ rotateY: 15, scale: 1.1 }}
//         transition={{ type: "spring", stiffness: 200 }}
//         className="text-3xl font-extrabold tracking-wide 
//         text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400
//         drop-shadow-[0_0_12px_rgba(56,189,248,0.7)]
//         cursor-pointer"
//       >
//         CRM App
//       </motion.h1>

//       {/* Menu Items */}
//       <ul className="flex gap-10 items-center text-white font-medium">
//         {menuItems.map((item) => {
//           const isActive = location.pathname === item.path;

//           return (
//             <motion.li
//               key={item.name}
//               whileHover={{ scale: 1.2, rotateX: 10, rotateY: -10 }}
//               transition={{ type: "spring", stiffness: 300 }}
//               className="relative cursor-pointer"
//             >
//               <Link
//                 to={item.path}
//                 className={`transition-all duration-200 ${
//                   isActive ? "text-blue-400" : "hover:text-cyan-300"
//                 }`}
//               >
//                 {item.name}
//               </Link>

//               {/* Active underline indicator */}
//               {isActive && (
//                 <motion.div
//                   layoutId="underline"
//                   className="absolute left-0 right-0 -bottom-1 h-[3px] bg-blue-400 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"
//                 />
//               )}
//             </motion.li>
//           );
//         })}
//       </ul>
//     </motion.nav>
//   );
// };

// export default Navbar;

