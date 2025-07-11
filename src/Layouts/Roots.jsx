import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import { Outlet } from "react-router";

const Roots = () => {
  return (
    <div>
      {/* header */}
      <div>
        <Navbar></Navbar>
      </div>
      {/* main */}
      <div>
        <Outlet></Outlet>
      </div>
      {/* footer */}
      <div></div>
    </div>
  );
};

export default Roots;
