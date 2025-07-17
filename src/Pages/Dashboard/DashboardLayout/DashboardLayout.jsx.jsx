import { use } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import { NavLink, Outlet } from "react-router";

import {
  FaHome,
  FaChartLine,
  FaStar,
  FaShoppingCart,
  FaPlus,
  FaBox,
  FaBullhorn,
  FaClipboardList,
  FaUsers,
  FaBoxes,
  FaAd,
  FaShoppingBag,
} from "react-icons/fa";

import { ImExit } from "react-icons/im";
import Loading from "../../../Shared/Logo/Loading/Loading";
import useUserRole from "../../../Hooks/useUserRole/useUserRole";
const DashboardLayout = () => {
  const { user, logOut, loading } = use(AuthContext);
  const { role, isRoleLoading } = useUserRole();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Sign-out successful");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const dashboardNavbar = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "underline text-green-600" : "text-black"
          }
        >
          <FaHome className="inline mr-2" /> Home
        </NavLink>
      </li>
      {!isRoleLoading && role === "user" && (
        <>
          <li>
            <NavLink
              to="/dashboard/home"
              className={({ isActive }) =>
                isActive ? "underline text-lime-600" : "text-black"
              }
            >
              <FaChartLine className="inline mr-2" /> View Price Trends
            </NavLink>
          </li>
          <li>
            {" "}
            <NavLink
              to="/dashboard/watchList"
              className={({ isActive }) =>
                isActive ? "underline text-lime-600" : "text-black"
              }
            >
              <FaStar className="inline mr-2" /> Manage Watchlist
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/orders"
              className={({ isActive }) =>
                isActive ? "underline text-lime-600" : "text-black"
              }
            >
              <FaShoppingCart className="inline mr-2" /> My Order List
            </NavLink>
          </li>
        </>
      )}

      {/* ✅ Vendor Dashboard NavLinks */}
      {!isRoleLoading && role === "vendor" && (
        <>
          <li>
            {" "}
            <NavLink
              to="/dashboard/home"
              className={({ isActive }) =>
                isActive ? "underline text-lime-600" : "text-black"
              }
            >
              <FaBox className="inline mr-2" /> My Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/add-product"
              className={({ isActive }) =>
                isActive ? "underline text-lime-600" : "text-black"
              }
            >
              <FaPlus className="inline mr-2" /> Add Product
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/add-advertisement"
              className={({ isActive }) =>
                isActive ? "underline text-lime-600" : "text-black"
              }
            >
              <FaBullhorn className="inline mr-2" /> Add Advertisement
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/my-advertisements"
              className={({ isActive }) =>
                isActive ? "underline text-lime-600" : "text-black"
              }
            >
              <FaClipboardList className="inline mr-2" /> My Advertisements
            </NavLink>
          </li>
        </>
      )}

      {/* ✅ Admin Dashboard NavLinks */}
      {!isRoleLoading && role === "admin" && (
        <>
          <li>
            <NavLink
              to="/dashboard/home"
              className={({ isActive }) =>
                isActive ? "underline text-lime-600" : "text-black"
              }
            >
              <FaUsers className="inline mr-2" /> All Users
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/all-products"
              className={({ isActive }) =>
                isActive ? "underline text-lime-600" : "text-black"
              }
            >
              <FaBoxes className="inline mr-2" /> All Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/all-ads"
              className={({ isActive }) =>
                isActive ? "underline text-lime-600" : "text-black"
              }
            >
              <FaAd className="inline mr-2" /> All Advertisements
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/all-orders"
              className={({ isActive }) =>
                isActive ? "underline text-lime-600" : "text-black"
              }
            >
              <FaShoppingBag className="inline mr-2" /> All Orders
            </NavLink>
          </li>
        </>
      )}
    </>
  );
  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content  ">
          <div className="drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex  lg:hidden ">
              {/* Navbar */}
              <div className="navbar flex justify-between items-center bg-base-200 w-full">
                <div className="flex-none lg:hidden">
                  <label
                    htmlFor="my-drawer-3"
                    aria-label="open sidebar"
                    className="btn btn-square btn-ghost"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="inline-block h-6 w-6 stroke-current"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      ></path>
                    </svg>
                  </label>
                </div>
                <NavLink to="/dashboard" className="mx-1 px-1 flex-1">
                  Dashboard
                </NavLink>
                <div>
                  {user && (
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
                  )}
                </div>
              </div>

              {/* Page content here */}
            </div>

            <div className="drawer-side">
              <label
                htmlFor="my-drawer-3"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu bg-base-200 min-h-full md:w-80 p-4">
                {/* Sidebar content here */}

                {dashboardNavbar}
              </ul>
            </div>
          </div>
          {/* Page content here */}
          <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <ul className="menu bg-base-200  text-base-content min-h-full w-80 p-4">
            {/* Sidebar content here */}
            {dashboardNavbar}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
