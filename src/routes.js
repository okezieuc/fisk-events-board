import { createBrowserRouter } from "react-router-dom";

import Index from "./pages";
import SignUpPage from "./pages/SignUpPage";
import LogInPage from "./pages/LogInPage";
import CreateEventPage from "./pages/createEvent";

const routes = createBrowserRouter([
    {
      path: "/",
      element: <Index />,
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