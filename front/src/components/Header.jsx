import { Link } from "react-router-dom";

function Header({ toggleSidebar }) {
  return (
    <header className="p-2 sm:p-10 text-center shadow-lg ">
      <button onClick={toggleSidebar} className="text-2xl absolute top-3 left-3 sm:top-6 sm:left-6">
        ☰
      </button>
      <Link to="/">
        <div className="flex items-center justify-center space-x-4 animate-fade-in">
          <img src="./src/assets/logo.png" className="w-16 sm:w-20 animate-bounce" alt="Logo" />
          <h1 className="text-5xl sm:text-6xl font-Sriracha text-blue-900 tracking-wider">Mathify</h1>
        </div>
      </Link>
      <p className="mt-5 text-2xl text-gray-700">Train Your Math Skills</p>
      <div className="absolute inset-0 pointer-events-none z-[-1] bg-gradient-to-r from-white-300/50 via-transparent to-gray-300/50"></div>
    </header>
  );
}

export default Header;
