import { Link } from "react-router-dom";

function Header({ toggleSidebar }) {
  return (
    <header className=" text-center shadow-lg bg-gray-500 border-b ">
      <button
        onClick={toggleSidebar}
        className="text-2xl pl-3 pt-2 pr-4 pb-4 absolute top-0 left-0 text-white"
      >
        ☰
      </button>
      <Link to="/">
        <div className="flex items-center justify-center space-x-4 animate-fade-in">
          <img src="./src/assets/logo.png" className="w-12  " alt="Logo" />
          <h1 className="text-3xl  text-white tracking-wider">Mathify</h1>
        </div>
      </Link>

      <div className="absolute inset-0 pointer-events-none z-[-1] bg-gradient-to-r from-white-300/50 via-transparent to-gray-300/50"></div>
    </header>
  );
}

export default Header;
