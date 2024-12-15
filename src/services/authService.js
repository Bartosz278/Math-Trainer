import { createContext, useContext, useEffect, useState } from "react";
import {
  login as loginService,
  register as registerService,
  logout as logoutService,
} from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  useEffect(() => {}, []);

  const login = async (username, password) => {
    try {
      const token = await loginService(username, password);
    } catch (error) {}
  };

  const register = async (username, password) => {
    try {
      await registerService(username, password);
    } catch (error) {}
  };

  const logout = () => {
    logoutService();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        isLoggedIn,
        register,
        logout,
        error,
        setError,
        message,
        setMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
