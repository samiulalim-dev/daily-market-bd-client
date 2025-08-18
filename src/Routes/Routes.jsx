import { createBrowserRouter } from "react-router";
import Roots from "../Layouts/Roots";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Error from "../Shared/Error/Error";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Dashboard from "../Pages/Dashboard/Dashboard";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import AdminPrivateRoute from "../PrivateRoute/AdminPrivateRoute/AdminPrivateRoute";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import VendorPrivateRoute from "../PrivateRoute/VendorPrivateroute/VendorPrivateRoute";
import VendorAddProducts from "../Pages/Dashboard/VendorAddProducts/VendorAddProducts";
import MyAdvertisements from "../Pages/Dashboard/MyAdvertisements/MyAdvertisements";
import MyProducts from "../Pages/Dashboard/MyProduct/MyProduct";
import AddAdvertisementForm from "../Pages/Dashboard/AddAdvertisementForm/AddAdvertisementForm";
import AdminAllProducts from "../Pages/Dashboard/AdminAllProducts/AdminAllProducts";
import AllAdvertisements from "../Pages/Dashboard/AllAdvertisementes/AllAdvertisements";
import AllProducts from "../Pages/AllProducts/AllProducts";
import { path } from "framer-motion/client";
import ViewDetails from "../Pages/ViewDetails/ViewDetails";
import ManageWatchlist from "../Pages/Dashboard/ManageWatchList/ManageWatchList";
import StripeCheckoutPage from "../Pages/StripeCheckoutPage/StripeCheckoutPage";
import MyOrders from "../Pages/Dashboard/MyOrders/MyOrders";
import AllOrders from "../Pages/Dashboard/AllOrders/AllOrders";
import TermsAndConditions from "../Components/TermsAndConditions/TermsAndConditions";
import AboutUs from "../Pages/AboutUs/AboutUs";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Roots,
    errorElement: <Error></Error>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/logIn",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "allProducts",
        Component: AllProducts,
      },
      {
        path: "terms",
        Component: TermsAndConditions,
      },
      {
        path: "aboutUs",
        Component: AboutUs,
      },
      {
        path: "/checkout/:id",
        element: (
          <PrivateRoute>
            <StripeCheckoutPage></StripeCheckoutPage>
          </PrivateRoute>
        ),
      },
      {
        path: "/products/:id",
        element: (
          <PrivateRoute>
            <ViewDetails></ViewDetails>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      {
        path: "home",
        Component: DashboardHome,
      },
      {
        path: "add-products",
        element: (
          <VendorPrivateRoute>
            <VendorAddProducts></VendorAddProducts>
          </VendorPrivateRoute>
        ),
      },
      {
        path: "home",
        element: (
          <VendorPrivateRoute>
            <MyProducts></MyProducts>
          </VendorPrivateRoute>
        ),
      },
      {
        path: "add-advertisement",
        element: (
          <VendorPrivateRoute>
            <AddAdvertisementForm></AddAdvertisementForm>
          </VendorPrivateRoute>
        ),
      },
      {
        path: "my-advertisements",
        element: (
          <VendorPrivateRoute>
            <MyAdvertisements></MyAdvertisements>
          </VendorPrivateRoute>
        ),
      },
      {
        path: "allUsers",
        element: (
          <AdminPrivateRoute>
            <AllUsers></AllUsers>
          </AdminPrivateRoute>
        ),
      },
      {
        path: "all-products",
        element: (
          <AdminPrivateRoute>
            <AdminAllProducts></AdminAllProducts>
          </AdminPrivateRoute>
        ),
      },
      {
        path: "all-ads",
        element: (
          <AdminPrivateRoute>
            <AllAdvertisements></AllAdvertisements>
          </AdminPrivateRoute>
        ),
      },
      {
        path: "all-orders",
        element: (
          <AdminPrivateRoute>
            <AllOrders></AllOrders>
          </AdminPrivateRoute>
        ),
      },
      {
        path: "watchList",
        element: (
          <PrivateRoute>
            <ManageWatchlist></ManageWatchlist>
          </PrivateRoute>
        ),
      },
      {
        path: "orders",
        element: (
          <PrivateRoute>
            <MyOrders></MyOrders>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
