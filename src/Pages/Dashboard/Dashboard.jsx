import React, { useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../../Components/Footer/Footer";
import DashboardLayout from "./DashboardLayout/DashboardLayout.jsx";

const Dashboard = () => {
  return (
    <div>
      <div className="min-h-screen flex flex-col">
        {/* Navbar */}
        <div className="hidden  sticky top-0 z-30  lg:block">
          <Navbar></Navbar>
        </div>

        {/*  Dashboard Layout */}
        <div>
          {/* Sidebar */}
          <DashboardLayout></DashboardLayout>

          {/* Main Content */}
          {/* <main className="flex-1 p-4">
            <Outlet></Outlet>
          </main> */}
        </div>

        {/*  Footer */}
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Dashboard;
