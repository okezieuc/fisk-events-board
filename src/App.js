import { StrictMode } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { RouterProvider } from "react-router-dom";
import routes from "./routes";

function App() {
  return (
    <StrictMode>
      <AuthProvider>
        <RouterProvider router={routes} />
      </AuthProvider>
    </StrictMode>
  );
}

export default App;
