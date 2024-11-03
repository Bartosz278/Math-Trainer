import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState();
  // localStorage.getItem("isLoggedIn") === "true ^^^^^"

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      const username = localStorage.getItem("username");
      if (token) {
        try {
          // -------->>> CZEKAMY NA ENDPOINTA Z USEREM :) <<<--------------
          // const response = await axios.get(`http://localhost:8080/${username}`, {
          //   headers: { Authorization: `Bearer ${token}` },
          // });
          // setUser(response.data);
          // setIsLoggedIn(true);
          // localStorage.setItem("isLoggedIn", "true");
        } catch (error) {
          console.error("Failed to fetch user data", error);
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
      const response = await axios.post(
        "http://localhost:8080/api/login",
        {
          username,
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        localStorage.setItem("token", response.data);
        localStorage.setItem("username", username);

        // -------->>> CZEKAMY NA ENDPOINTA Z USEREM :) <<<--------------

        // const userResponse = await axios.get(`http://localhost:8080/users/username/${username}`, {
        //   headers: { Authorization: `Bearer ${response.data}` },
        // });
        // setUser(userResponse.data);
        setMessage("Login successful!");
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true"); // Zapisz isLoggedIn do localStorage
        return true;
      }
    } catch (error) {
      console.error("Login error:", error.response);
      const errorMessage = error.response?.data ? (typeof error.response.data === "string" ? error.response.data : JSON.stringify(error.response.data)) : "An error occurred. Please try again.";

      setError(errorMessage);
    }
  };

  const register = async (username, password, lvl = 1) => {
    try {
      const response = await axios.post("http://localhost:8080/api/register", {
        username,
        password,
        lvl,
      });

      if (response.status === 200) {
        setMessage("Registration successful! You can now log in.");
        console.log(response);

        return true;
      }
    } catch (error) {
      console.error("Registration error:", error.response);
      // Sprawdzenie, czy error.response.data jest obiektem
      const errorMessage = typeof error.response?.data === "object" ? JSON.stringify(error.response.data) : error.response?.data || "An error occurred during registration.";

      setError(errorMessage); // Ustawienie zrozumiałego tekstu błędu
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", "false"); // Usuń stan logowania z localStorage
  };

  return <AuthContext.Provider value={{ user, loading, login, isLoggedIn, register, logout, error, setError, message }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
