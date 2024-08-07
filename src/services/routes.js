import { createBrowserRouter } from "react-router-dom";

import HomePage from "../pages/HomePage";
import SignUpPage from "../pages/SignUpPage";
import LogInPage from "../pages/LogInPage";
import CreateEventPage from "../pages/CreateEventPage";

import ProtectedRoute from "../components/ProtectedRoute";

const routes = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/signup",
      element: <SignUpPage />,
    },
    {
      path: "/login",
      element: <LogInPage />,
    },
    {
      path: "/create",
      element: <ProtectedRoute><CreateEventPage /></ProtectedRoute>,
    },
  ]);

export default routes;