import React from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { RouterProvider } from "react-router-dom";
import routes from "./services/routes"; 

function App() {
  return (
    <React.StrictMode>
      <AuthProvider>
        <RouterProvider router={routes} />
      </AuthProvider>
    </React.StrictMode>
  );
}

export default App;
