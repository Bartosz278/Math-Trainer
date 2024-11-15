import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true ");

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const response = await axios.get(`http://localhost:8080/api/userDetails`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
          setIsLoggedIn(true);
          localStorage.setItem("isLoggedIn", "true");
        } catch (error) {
          setUser(null);
          setIsLoggedIn(false);
          localStorage.setItem("isLoggedIn", "false");
        }
      }
      setLoading(false);
    };
    fetchUserData();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post("http://localhost:8080/api/login", { username, password }, { headers: { "Content-Type": "application/json" } });

      if (response.status === 200) {
        localStorage.setItem("token", response.data);
        localStorage.setItem("username", username);

        const userResponse = await axios.get(`http://localhost:8080/api/userDetails`, { headers: { Authorization: `Bearer ${response.data}` } });
        setUser(userResponse.data);
        setMessage("Login successful!");
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");
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
    }
  };

  const register = async (username, password) => {
    try {
      const response = await axios.post("http://localhost:8080/api/register", {
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
