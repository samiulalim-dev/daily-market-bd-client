import { use, useContext } from "react";
import { GoDotFill } from "react-icons/go";
import { FaUserCircle, FaSignOutAlt, FaCog, FaEnvelope } from "react-icons/fa";
import { AuthContext } from "../../../AuthProvider/AuthProvider";

const UserProfile = () => {
  const { user } = use(AuthContext);

  return (
    <div className="p-4 mb-4 border-b-2 border-gray-400 flex flex-col items-center gap-3">
      {/* Profile Picture */}
      {user?.photoURL ? (
        <img
          src={user.photoURL}
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover border-4 border-green-500"
        />
      ) : (
        <FaUserCircle className="w-20 h-20 text-gray-400" />
      )}

      {/* User Info */}
      <div className="text-center">
        <h2 className="text-lg text-white font-semibold">
          {user?.displayName || "User Name"}
        </h2>
        <p className="text-md  text-white flex items-center justify-center gap-1">
          <FaEnvelope /> {user?.email || "example@email.com"}
        </p>
        <span className="flex items-center justify-center mt-2">
          <span className=" text-blue-400">
            <GoDotFill size={25} />
          </span>{" "}
          <span className=" text-white font-medium">Online</span>
        </span>
      </div>
    </div>
  );
};

export default UserProfile;
