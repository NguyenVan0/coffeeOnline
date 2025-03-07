import { createBrowserRouter } from "react-router-dom";
import { DefaultLayout } from "../layouts/DefaultLayout";
import { Checkout } from "../pages/Checkout";
import { Home } from "../pages/Home";
import { Login } from "../pages/auth/Login";
import { LocationPicker } from "../pages/Address/address";
import { Order } from "../pages/Order";
import { OrderManagement } from "../pages/Order/OrderManagement";
import { Register } from "../pages/auth/Register";
import EditAccount from "../pages/auth/edit-account";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/checkout", element: <Checkout /> },
      { path: "/address", element: <LocationPicker /> },
      { path: "/infoOrder", element: <OrderManagement /> },
      { path: "/order/:orderId", element: <Order /> },
      { path: "/edit-account", element: <EditAccount /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
