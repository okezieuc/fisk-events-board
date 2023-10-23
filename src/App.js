import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StrictMode } from "react";
import Index from "./routes";
import SignUpPage from "./routes/SignUpPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/signup",
    element: <SignUpPage />
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
