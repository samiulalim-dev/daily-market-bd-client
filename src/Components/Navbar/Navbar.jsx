import Logo from "../../Shared/Logo/Logo";
import { Link, NavLink } from "react-router";
import { FaSignInAlt } from "react-icons/fa";
const Navbar = () => {
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
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Parent</a>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
          <div>
            <Logo></Logo>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
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
          </ul>
        </div>
        <div className="navbar-end">
          <Link to="/logIn" className="btn btn-primary text-white">
            <FaSignInAlt className="text-white" /> Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
