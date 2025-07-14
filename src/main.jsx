import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router";
import { router } from "./Routes/Routes.jsx";

import "aos/dist/aos.css";
import Aos from "aos";
import AuthProvider from "./AuthProvider/AuthProvider.jsx";
import { ToastContainer } from "react-toastify";

Aos.init({
  duration: 1000,
  once: false,
});
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
      <ToastContainer position="top-right" />
    </AuthProvider>
  </StrictMode>
);
