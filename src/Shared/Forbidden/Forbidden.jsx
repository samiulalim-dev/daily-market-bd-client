import React from "react";
import { FaBan } from "react-icons/fa";
import { Link } from "react-router";

const Forbidden = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <FaBan className="text-red-600 text-8xl mb-6" />
      <h1 className="text-5xl font-bold mb-4 text-red-700">403 Forbidden</h1>
      <p className="text-lg mb-6 text-gray-700">
        Sorry, you don't have permission to access this page.
      </p>
      <Link
        to="/"
        className="btn btn-primary px-6 py-3 text-white rounded hover:bg-accent"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default Forbidden;
