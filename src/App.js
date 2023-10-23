import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StrictMode } from "react";
import Index from "./routes";
import CreateLogin from "./routes/createSignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/Login",
    element: <CreateLogin />
  }
]);

function App() {
  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}

export default App;
