import React from "react";

import errorMessage from "../../assets/errorMessage.json";
import Lottie from "lottie-react";
import { Link } from "react-router";

const Error = () => {
  return (
    <section className="flex items-center h-full p-16 bg-gray-50 text-gray-800">
      <div
        className="container flex flex-col items-center justify-center px-5 mx-auto my-2"
        bis_skin_checked="1"
      >
        <div className="max-w-md text-center" bis_skin_checked="1">
          <span>
            <Lottie animationData={errorMessage}></Lottie>
          </span>
          <p className="text-2xl mt-4 mb-8 font-semibold md:text-3xl">
            Sorry, we couldn't find this page.
          </p>

          <Link
            to="/"
            className="px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg"
          >
            Back to homepage
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Error;
