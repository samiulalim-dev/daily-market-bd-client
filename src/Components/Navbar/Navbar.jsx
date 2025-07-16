import Logo from "../../Shared/Logo/Logo";
import { Link, NavLink } from "react-router";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { use } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { div } from "framer-motion/client";
import { ImExit } from "react-icons/im";
import Loading from "../../Shared/Logo/Loading/Loading";
import { toast } from "react-toastify";
const Navbar = () => {
  const { user, logOut } = use(AuthContext);
  const sharedNavbar = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-green-700 underline" : "text-black"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/allProducts"
          className={({ isActive }) =>
            isActive ? "text-green-700 underline" : "text-black"
          }
        >
          All Product
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? "text-green-700 underline" : "text-black"
              }
            >
              Dashboard
            </NavLink>
          </li>
        </>
      )}
      <li>
        <NavLink
          to="/contacts"
          className={({ isActive }) =>
            isActive ? "text-green-700 underline" : "text-black"
          }
        >
          Contact
        </NavLink>
      </li>
    </>
  );
  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Sign-out successful");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="bg-base-100 shadow-sm">
      <div className="navbar w-11/12 mx-auto ">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn  pl-0 pr-8 md:pr-4  btn-ghost lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {sharedNavbar}
            </ul>
          </div>
          <div>
            <Logo></Logo>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{sharedNavbar}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div>
              <div className="dropdown block sm:hidden dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src={user?.photoURL || "/avatar.png"}
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <button
                      onClick={handleLogOut}
                      className="btn btn-primary text-white flex items-center gap-2"
                    >
                      <ImExit className="text-white text-lg" /> Log Out
                    </button>
                  </li>
                </ul>
              </div>
              <div className="sm:flex hidden  items-center gap-3">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-green-600">
                  <img
                    src={user?.photoURL || "/avatar.png"} // fallback image
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogOut}
                  className="btn btn-primary text-white flex items-center gap-2"
                >
                  <ImExit className="text-white text-lg" /> Log Out
                </button>
              </div>
            </div>
          ) : (
            <Link to="/logIn" className="btn btn-primary text-white">
              <FaSignInAlt className="text-white" /> Log in
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
