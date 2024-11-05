import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const useLogin = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { login, register, error, setError, setMessage, message, isLoggedIn } =
    useAuth();
  const navigate = useNavigate();
  const guest = { username: "admin", password: "admin" };

  const loginHandle = async (e, asGuest = false) => {
    e.preventDefault();

    if (isSignUp && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (isSignUp) {
      const success = await register(username, password);
      if (success) {
        setIsSignUp(false);
        resetForm();
      }
    } else {
      const success = await login(
        asGuest ? guest.username : username,
        asGuest ? guest.password : password
      );
      if (success) {
        resetForm();
        navigate("/");
      }
    }
  };

  const resetForm = () => {
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setError(null);
    setMessage(null);
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    if (error) setError(null); // Reset błędów podczas edycji
  };

  return {
    isSignUp,
    setIsSignUp,
    username,
    setUsername: handleInputChange(setUsername),
    password,
    setPassword: handleInputChange(setPassword),
    confirmPassword,
    setConfirmPassword: handleInputChange(setConfirmPassword),
    loginHandle,
    resetForm,
    error,
    message,
    isLoggedIn,
  };
};

export default useLogin;
