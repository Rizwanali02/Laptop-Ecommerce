import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("lapy-user")) || null
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [lapy, setLapy] = useState([]);
  const [mode, setMode] = useState("light");

  useEffect(() => {
    localStorage.setItem("lapy-user", JSON.stringify(user));
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        lapy,
        setLapy,
        mode,
        setMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
