import { createContext } from "react";

const UserContext = createContext({
  loading: true,
  user: null,
});

export default UserContext;
