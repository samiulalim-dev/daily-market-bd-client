import React, { use } from "react";
import Navbar from "../Components/Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../Components/Footer/Footer";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Loading from "../Shared/Logo/Loading/Loading";

const Roots = () => {
  const { loading } = use(AuthContext);
  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      {/* header */}
      <div className=" sticky top-0 z-30 ">
        <Navbar></Navbar>
      </div>
      {/* main */}
      <div>
        <Outlet></Outlet>
      </div>
      {/* footer */}
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Roots;
