import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logika logowania tutaj
  };

  return (
    <div className="h-screen absolute w-screen top-0 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-blue-900/80 rounded-md drop-shadow-[0_35px_35px_rgba(0,0,0,0.8)] w-3/4 md:w-2/3 max-w-[400px] p-6">
        <div className="flex justify-center">
          <img src="./src/assets/logo.png" className="w-24 md:w-32" alt="Logo" />
          <span className="text-white m-auto mx-0 p-3 px-0 text-4xl font-mono font-semibold text-center align-center md:text-5xl">Mathify</span>
        </div>
        <p className="text-center text-2xl mb-4 font-Inconsolata font-bold text-white">Log in to enjoy the full version!</p>

        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-3">
          <div className="flex flex-col w-4/5">
            <label className="text-white mb-1">Login</label>
            <input type="text" required placeholder="Login" className="p-3 rounded-sm" />
          </div>

          <div className="flex flex-col w-4/5">
            <label className="text-white mb-1">Password</label>
            <input type="password" required placeholder="Password" className="p-3 rounded-sm" />
          </div>
          {isSignUp ? (
            <div className="flex flex-col w-4/5">
              <label className="text-white mb-1">Confirm password</label>
              <input type="password" required placeholder="Password" className="p-3 rounded-sm" />
            </div>
          ) : null}

          <button type="submit" className="bg-lightGreen h-10 w-4/5 rounded-sm font-extrabold mt-4 self-center text-xl tracking-wider">
            {isSignUp ? "Sign up" : "Log in"}
          </button>

          {isSignUp ? (
            <span onClick={() => setIsSignUp(false)} className="text-white mt-4 text-sm cursor-pointer">
              &larr; Back to <u className="text-lightGreen font-bold underline ">log in</u>
            </span>
          ) : (
            <span className="text-white mt-4 text-sm">
              Don’t have an account?{" "}
              <a onClick={() => setIsSignUp(true)} className="text-lightGreen font-bold underline cursor-pointer">
                Sign up
              </a>
            </span>
          )}

          <span className="text-white mt-2">
            or play as a{" "}
            <u className="cursor-pointer">
              <Link to="/">Guest</Link>
            </u>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Login;
