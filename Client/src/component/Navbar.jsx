// import React from "react";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   return (
//     <nav className="
//       bg-white/20 
//       backdrop-blur-lg 
//       shadow-md 
//       border-b border-white/30 
//       px-8 py-4 
//       flex justify-between items-center
//       sticky top-0 z-50
//     ">
//       {/* Logo */}
//       <h1 className="text-2xl font-semibold text-blue-700 tracking-wide">
//         CRM App
//       </h1>

//       {/* Menu */}
//       <ul className="flex gap-8 items-center text-gray-800 font-medium">
//         <li>
//           <Link 
//             to="/" 
//             className="hover:text-blue-600 transition-all duration-200 hover:scale-105"
//           >
//             Home
//           </Link>
//         </li>

//         <li>
//           <Link 
//             to="/leads" 
//             className="hover:text-blue-600 transition-all duration-200 hover:scale-105"
//           >
//             Leads
//           </Link>
//         </li>

//         <li>
//           <Link 
//             to="/activities" 
//             className="hover:text-blue-600 transition-all duration-200 hover:scale-105"
//           >
//             Activities
//           </Link>
//         </li>

//         <li>
//           <Link 
//             to="/login" 
//             className="hover:text-blue-600 transition-all duration-200 hover:scale-105"
//           >
//             Login
//           </Link>
//         </li>

//         <li>
//           <Link 
//             to="/register" 
//             className="hover:text-blue-600 transition-all duration-200 hover:scale-105"
//           >
//             Register
//           </Link>
//         </li>
//       </ul>
//     </nav>
//   );
// };

// // export default Navbar;


import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
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
        sticky top-10 z-50 rounded-b-2xl
      "
    >

      {/* Logo with 3D Effect */}
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
          { name: "Login", path: "/login" },
          { name: "Register", path: "/register" },
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

      </ul>
    </motion.nav>
  );
};

export default Navbar;
