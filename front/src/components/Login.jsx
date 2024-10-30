import { useState } from "react";

function Login() {
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logika logowania tutaj
  };

  return (
    <div className="h-screen absolute w-screen top-0 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-blue-900/80 rounded-md drop-shadow-[0_35px_35px_rgba(0,0,0,0.8)] w-3/4 md:w-2/3 max-w-[400px] p-6">
        <p className="text-center text-2xl mb-4 font-Inconsolata font-bold text-white">Log in to enjoy the full version!</p>

        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-3">
          <div className="flex flex-col w-4/5">
            <label className="text-white mb-1">Login</label>
            <input type="text" placeholder="Login" className="p-3 rounded-sm" />
          </div>

          <div className="flex flex-col w-4/5">
            <label className="text-white mb-1">Password</label>
            <input type="password" placeholder="Password" className="p-3 rounded-sm" />
          </div>
          {isSignUp ? (
            <div className="flex flex-col w-4/5">
              <label className="text-white mb-1">Confirm password</label>
              <input type="password" placeholder="Password" className="p-3 rounded-sm" />
            </div>
          ) : null}

          <button type="submit" className="bg-lightGreen h-10 w-4/5 rounded-sm font-bold mt-4 self-center">
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
            or play as a <u className="cursor-pointer">Guest</u>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Login;
