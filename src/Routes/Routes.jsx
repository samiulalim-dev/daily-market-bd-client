import { createBrowserRouter } from "react-router";
import Roots from "../Layouts/Roots";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: Roots,
    children: [{}],
  },
]);
