import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StrictMode } from "react";
import Index from "./routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
]);

function App() {
  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}

export default App;
