import { createBrowserRouter } from "react-router-dom";

import HomePage from "./pages/HomePage";
import SignUpPage from "../pages/SignUpPage";
import LogInPage from "../pages/LogInPage";
import CreateEventPage from "../pages/CreateEventPage";

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
      element: <CreateEventPage />,
    },
  ]);

export default routes;