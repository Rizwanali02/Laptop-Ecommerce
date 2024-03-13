import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("lapy-user")) || null
  );
  const [isAuthenticated, setIsAuthenticated] = useState(!!user);
  const [lapy, setLapy] = useState([]);
  const [mode, setMode] = useState("light");
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("lapy-cart")) || []
  );

  useEffect(() => {
    localStorage.setItem("lapy-user", JSON.stringify(user));
    setIsAuthenticated(!!user);
  }, [user]);

  useEffect(() => {
    localStorage.setItem("lapy-cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item._id !== productId));
  };

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
        cart,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
