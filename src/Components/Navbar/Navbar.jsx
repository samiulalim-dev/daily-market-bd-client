import { Link, NavLink } from "react-router";
import {
  FaSignInAlt,
  FaHome,
  FaBox,
  FaTachometerAlt,
  FaBell,
  FaUser,
  FaCog,
} from "react-icons/fa";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { ImExit } from "react-icons/im";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { IoMdArrowDropdown } from "react-icons/io";
import { toast } from "react-toastify";
import Logo from "../../Shared/Logo/Logo";
import ThemeToggle from "../ThemeToogle/ThemeToogle";

// ✅ Reusable NavItem Component
const NavItem = ({ to, icon, label, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
        isActive
          ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg"
          : "text-gray-700 dark:text-gray-300 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
      }`
    }
  >
    {icon}
    <span>{label}</span>
  </NavLink>
);

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation items
  const navigationItems = [
    { to: "/", label: "Home", icon: <FaHome className="w-4 h-4" /> },
    {
      to: "/allProducts",
      label: "All Products",
      icon: <FaBox className="w-4 h-4" />,
    },
    ...(user
      ? [
          {
            to: "/dashboard",
            label: "Dashboard",
            icon: <FaTachometerAlt className="w-4 h-4" />,
          },
        ]
      : []),
  ];

  // Logout handler
  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Sign-out successful");
      })
      .catch(() => toast.error("Error signing out"));
  };

  return (
    <div
      className={`transition-all duration-300 ${
        isScrolled
          ? "bg-white/88 dark:bg-gray-900/95 backdrop-blur-md shadow-xl border-b border-gray-200/50 dark:border-gray-700/50"
          : "bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-lg"
      }`}
    >
      <div className="navbar md:w-11/12 mx-auto px-2">
        {/* Left Section: Mobile Button + Logo */}
        <div className="navbar-start flex items-center gap-2">
          {/* Mobile menu button */}
          <div className="lg:hidden  mr-2 ">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="  text-black hover:bg-emerald-100 dark:hover:bg-emerald-900/30"
            >
              {isMenuOpen ? (
                <HiX className="h-6 w-6" />
              ) : (
                <HiMenuAlt3 className="h-6 w-6" />
              )}
            </button>
          </div>
          <Logo />
        </div>

        {/* Center Section: Desktop Nav */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal space-x-2">
            {navigationItems.map((item, i) => (
              <li key={i}>
                <NavItem {...item} />
              </li>
            ))}
          </ul>
        </div>

        {/* Right Section: User / Login */}
        <div className="navbar-end flex items-center sm:gap-3">
          {/* ThemeToggle */}
          <ThemeToggle></ThemeToggle>

          {/* User Menu */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 p-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all duration-300"
              >
                <img
                  src={user?.photoURL || "/avatar.png"}
                  alt="User Avatar"
                  className="w-10 h-10 object-cover rounded-full ring-2 ring-emerald-500/40"
                />
                <span className="hidden md:block text-sm text-gray-700 dark:text-gray-300">
                  {user?.displayName || user?.email?.split("@")[0] || "User"}
                </span>
                <IoMdArrowDropdown
                  className={`text-gray-400 transition-transform duration-200 ${
                    isProfileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown */}
              {isProfileOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsProfileOpen(false)}
                  ></div>
                  <div
                    className="absolute right-0 mt-2 w-72 rounded-2xl z-50 p-4 animate-fadeIn 
                      bg-gradient-to-br from-emerald-500 to-teal-600 shadow-2xl border border-emerald-400/40
                      text-white"
                  >
                    {/* User Info */}
                    <div className="flex items-center gap-4 border-b border-white/30 pb-4 mb-3">
                      <img
                        src={user?.photoURL || "/avatar.png"}
                        alt="User Avatar"
                        className="w-14 h-14 object-cover rounded-full ring-2 ring-white/40"
                      />
                      <div>
                        <p className="font-semibold">
                          {user?.displayName || "User"}
                        </p>
                        <p className="text-sm opacity-80">{user?.email}</p>
                      </div>
                    </div>

                    {/* Logout Button */}
                    <button
                      onClick={handleLogOut}
                      className="flex cursor-pointer items-center gap-2 p-2 mt-2 w-full rounded bg-red-600 hover:bg-red-700 transition-colors duration-200 text-white font-medium justify-center"
                    >
                      <ImExit /> Log Out
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <Link
              to="/logIn"
              className="btn bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:scale-105 transition-transform"
            >
              <FaSignInAlt /> <span className="hidden sm:inline">Log In</span>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-xl">
          <div className="px-4 py-6 space-y-2">
            {navigationItems.map((item, i) => (
              <NavItem key={i} {...item} onClick={() => setIsMenuOpen(false)} />
            ))}
            {!user && (
              <Link
                to="/logIn"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium"
              >
                <FaSignInAlt /> Log In
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Dropdown animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
      `}</style>
    </div>
  );
};

export default Navbar;

// {/* <div className="bg-base-100 shadow-sm">
//   {" "}
//   <div className="navbar w-11/12 mx-auto ">
//     {" "}
//     <div className="navbar-start">
//       {" "}
//       <div className="dropdown">
//         {" "}
//         <div
//           tabIndex={0}
//           role="button"
//           className="btn  pl-0 pr-8 md:pr-4  btn-ghost lg:hidden"
//         >
//           {" "}
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-5 w-5"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             {" "}
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M4 6h16M4 12h8m-8 6h16"
//             />{" "}
//           </svg>{" "}
//         </div>{" "}
//         <ul
//           tabIndex={0}
//           className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
//         >
//           {" "}
//           {sharedNavbar}{" "}
//         </ul>{" "}
//       </div>{" "}
//       <div>
//         {" "}
//         <Logo></Logo>{" "}
//       </div>{" "}
//     </div>{" "}
//     <div className="navbar-center hidden lg:flex">
//       {" "}
//       <ul className="menu menu-horizontal px-1">{sharedNavbar}</ul>{" "}
//     </div>{" "}
//     <div className="navbar-end">
//       {" "}
//       {user ? (
//         <div>
//           {" "}
//           <div className="dropdown block sm:hidden dropdown-end">
//             {" "}
//             <div
//               tabIndex={0}
//               role="button"
//               className="btn btn-ghost btn-circle avatar"
//             >
//               {" "}
//               <div className="w-10 rounded-full">
//                 {" "}
//                 <img
//                   alt="Tailwind CSS Navbar component"
//                   src={user?.photoURL || "/avatar.png"}
//                 />{" "}
//               </div>{" "}
//             </div>{" "}
//             <ul
//               tabIndex={0}
//               className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
//             >
//               {" "}
//               <li>
//                 {" "}
//                 <button
//                   onClick={handleLogOut}
//                   className="btn btn-primary text-white flex items-center gap-2"
//                 >
//                   {" "}
//                   <ImExit className="text-white text-lg" /> Log Out{" "}
//                 </button>{" "}
//               </li>{" "}
//             </ul>{" "}
//           </div>{" "}
//           <div className="sm:flex hidden  items-center gap-3">
//             {" "}
//             {/* Avatar /}                 <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-green-600">                   <img                     src={user?.photoURL || "/avatar.png"} // fallback image                     alt="User Avatar"                     className="w-full h-full object-cover"                   />                 </div>                  {/ Logout Button */}{" "}
//             <button
//               onClick={handleLogOut}
//               className="btn btn-primary text-white flex items-center gap-2"
//             >
//               {" "}
//               <ImExit className="text-white text-lg" /> Log Out{" "}
//             </button>{" "}
//           </div>{" "}
//         </div>
//       ) : (
//         <Link to="/logIn" className="btn btn-primary text-white">
//           {" "}
//           <FaSignInAlt className="text-white" /> Log in{" "}
//         </Link>
//       )}{" "}
//     </div>{" "}
//   </div>{" "}
// </div>; */}
