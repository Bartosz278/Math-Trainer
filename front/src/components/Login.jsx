function Login() {
  const handleSubmit = (e) => {
    e.preventDefault();
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

          <button type="submit" className="bg-lightGreen h-10 w-4/5 rounded-sm font-bold mt-4 self-center">
            Log in
          </button>

          <span className="text-white mt-2">
            or play as a <u>Guest</u>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Login;
