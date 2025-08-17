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
        toast.success("Sign-out successful", {
          style: {
            background: "linear-gradient(135deg,#10b981,#059669)",
            color: "white",
          },
        });
      })
      .catch(() => toast.error("Error signing out"));
  };

  return (
    <div
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-xl border-b border-gray-200/50 dark:border-gray-700/50"
          : "bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-lg"
      }`}
    >
      <div className="navbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Left Section: Mobile Button + Logo */}
        <div className="navbar-start flex items-center gap-2">
          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className=" p-2 hover:bg-emerald-100 dark:hover:bg-emerald-900/30"
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
        <div className="navbar-end flex items-center gap-3">
          {/* Notifications */}
          <ThemeToggle></ThemeToggle>

          {/* User Menu */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 p-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
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
                  className={`text-gray-400 transition-transform ${
                    isProfileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown */}
              {isProfileOpen && (
                <>
                  <div
                    className="fixed  inset-0 z-40"
                    onClick={() => setIsProfileOpen(false)}
                  ></div>
                  <div className="absolute right-0  mt-2 w-72 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl z-50 p-4 animate-fadeIn">
                    <div className="flex  items-center gap-4 border-b pb-4 mb-3">
                      <img
                        src={user?.photoURL || "/avatar.png"}
                        alt="User Avatar"
                        className="w-14 h-14 object-cover rounded-full ring-2 ring-emerald-500/40"
                      />
                      <div>
                        <p className="font-semibold">
                          {user?.displayName || "User"}
                        </p>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                      </div>
                    </div>

                    <button
                      onClick={handleLogOut}
                      className="flex items-center gap-2 p-2 mt-2 w-full text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
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
