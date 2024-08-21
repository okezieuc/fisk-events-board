import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import SignUpPage from "../pages/SignUpPage";
import LogInPage from "../pages/LogInPage";
import CreateEventPage from "../pages/CreateEventPage";
import Dashboard from "../dashboard/Dashboard"; 
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
  {
    path: "/dashboard",
    element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
  },
  {
    path: "/edit-event/:id", 
    element: <ProtectedRoute></ProtectedRoute>,
  },
]);

export default routes;