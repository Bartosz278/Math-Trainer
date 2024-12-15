import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true ");

  const fetchUserData = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const response = await axios.get(`https://mathtrainer.onrender.com/api/userDetails`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");
      } catch (error) {
        setUser(null);
        setError(error);
        setIsLoggedIn(false);
        localStorage.setItem("isLoggedIn", "false");
      }
    }
    setLoading(false);
  };

  const login = async (username, password) => {
    setLoading(true);
    try {
      const response = await axios.post("https://mathtrainer.onrender.com/api/login", { username, password }, { headers: { "Content-Type": "application/json" } });

      if (response.status === 200) {
        localStorage.setItem("token", response.data);
        localStorage.setItem("username", username);

        const userResponse = await axios.get(`https://mathtrainer.onrender.com/api/userDetails`, { headers: { Authorization: `Bearer ${response.data}` } });
        setUser(userResponse.data);
        setMessage("Login successful!");
        if (username != "admin") {
          setIsLoggedIn(true);
          localStorage.setItem("isLoggedIn", "true");
        }
        setLoading(false);
        return true;
      }
    } catch (error) {
      console.error("Login error:", error.response);
      let errorMessage = "An error occurred. Please try again.";

      if (error.response) {
        if (error.response.status === 401) {
          errorMessage = "Access denied: Invalid username or password.";
        } else if (error.response.status === 500) {
          errorMessage = "Server error. Please try again later.";
        } else if (error.response.status === 404) {
          errorMessage = "Endpoint not found. Please contact support.";
        } else {
          errorMessage = error.response.data?.message || errorMessage;
        }
      }
      setError(errorMessage);
      setLoading(false);
    }
    setLoading(false);
  };

  const register = async (username, password) => {
    try {
      const response = await axios.post("https://mathtrainer.onrender.com/api/register", {
        username,
        password,
      });

      if (response.status === 200) {
        setMessage("Registration successful! You can now log in.");
        return true;
      }
    } catch (error) {
      console.error("Registration error:", error.response);

      const errorMessage = typeof error.response?.data === "object" ? JSON.stringify(error.response.data) : error.response?.data || "An error occurred during registration.";

      setError(errorMessage);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", "false");
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
        fetchUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
