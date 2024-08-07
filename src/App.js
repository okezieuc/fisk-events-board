import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StrictMode, useState, useEffect } from "react";
import Index from "./pages";
import SignUpPage from "./pages/SignUpPage";
import LogInPage from "./pages/LogInPage";
import CreateEventPage from "./pages/createEvent";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "./utils/firebase";
import UserContext from "./utils/userContext";

const auth = getAuth(app);

const router = createBrowserRouter([
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

function App() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const unsubscriber = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const uid = user.uid;
        setUser({ uid });
      } else {
        // User is signed out
        setUser(null);
      }
      setLoadingUser(false);
    });

    return () => unsubscriber();
  }, []);

  return (
    <StrictMode>
      <UserContext.Provider value={{ user, loading: loadingUser }}>
        <RouterProvider router={router} />
      </UserContext.Provider>
    </StrictMode>
  );
}

export default App;
