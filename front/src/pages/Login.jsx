import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaArrowRight } from "react-icons/fa";

function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const {
    login,
    register,
    error,
    message,
    setError,
    isLoggedIn,
    setMessage,
    user,
    logout,
  } = useAuth();
  const navigate = useNavigate();
  const guest = { username: "admin", password: "admin" };

  useEffect(() => {
    if (isLoggedIn) {
      if (!user?.username || user.username === "admin") {
        logout();
      } else {
        navigate("/home");
      }
    }
  }, [isLoggedIn, user, navigate, logout]);

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
    setError("");
    setMessage("");
    setConfirmPassword("");
  };

  return (
    <div className="h-screen absolute w-screen top-0 flex items-center justify-center">
      <div className="bg-gray-400/70 backdrop-blur-sm border-[5px] rounded-[20px] drop-shadow-[0_35px_35px_rgba(0,0,0,0.8)] w-3/4 md:w-2/3 max-w-[400px] p-6">
        <Link to="/">
          <div className="flex justify-center">
            <img
              src="./src/assets/logo.png"
              className="w-24 md:w-32"
              alt="Logo"
            />
            <span className="text-white m-auto mx-0 p-3 px-0 text-4xl font-mono font-semibold text-center align-center md:text-5xl">
              Mathify
            </span>
          </div>
        </Link>

        {!user?.username || user.username === "admin" ? (
          <>
            {error && <p className="text-red-500 text-center">{error}</p>}
            {message && <p className="text-blue-950 text-center">{message}</p>}
            <form
              onSubmit={loginHandle}
              className="flex flex-col items-center gap-3"
            >
              <div className="flex flex-col w-4/5">
                <label className="text-white mb-1">Login</label>
                <input
                  type="text"
                  required
                  placeholder="Login"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="p-3 rounded-xl"
                  autoComplete="username"
                />
              </div>

              <div className="flex flex-col w-4/5">
                <label className="text-white mb-1">Password</label>
                <input
                  type="password"
                  required
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="p-3 rounded-xl"
                  autoComplete="current-password"
                />
              </div>

              {isSignUp && (
                <div className="flex flex-col w-4/5">
                  <label className="text-white mb-1">Confirm Password</label>
                  <input
                    type="password"
                    required
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="p-3 rounded-xl"
                  />
                </div>
              )}

              <button
                type="submit"
                className="bg-blue-950 text-white border-2 h-10 w-2/5 rounded-md font-extrabold mt-4 self-center text-xl tracking-wider"
              >
                {isSignUp ? "Sign up" : "Log in"}
              </button>

              {isSignUp ? (
                <span
                  onClick={() => setIsSignUp(false)}
                  className="text-white mt-4 text-sm cursor-pointer"
                >
                  &larr; Back to{" "}
                  <u className="text-lightGreen font-bold underline">log in</u>
                </span>
              ) : (
                <span className="text-white mt-4 text-sm">
                  Don’t have an account?{" "}
                  <a
                    onClick={() => setIsSignUp(true)}
                    className="text-blue-950 font-bold underline cursor-pointer"
                  >
                    Sign up
                  </a>
                </span>
              )}

              <span className="text-white mt-2">
                or play as a{" "}
                <u
                  className="cursor-pointer"
                  onClick={(e) => loginHandle(e, true)}
                >
                  <Link to="/">Guest</Link>
                </u>
              </span>
            </form>
          </>
        ) : (
          <div className="flex justify-around items-center">
            <p className="text-white text-xl">You are already logged in.</p>
            <Link to="/">
              <FaArrowRight size={24} className="cursor-pointer" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
