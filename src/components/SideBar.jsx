import { Link } from "react-router-dom";
import { TbArrowBackUp } from "react-icons/tb";
import { IoHomeOutline } from "react-icons/io5";
import { IoIosStats } from "react-icons/io";
import { TbLogout2 } from "react-icons/tb";
import { CiLogin } from "react-icons/ci";
import { useAuth } from "../context/AuthContext";
import { useRef, useEffect } from "react";

function Sidebar({ isOpen, toggleSidebar }) {
  const { isLoggedIn, logout, user } = useAuth();
  const sidebarRef = useRef(null);
  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      toggleSidebar();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={sidebarRef} className={`border-r fixed top-0 left-0 h-full w-44 bg-gray-500 text-white transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out z-50`}>
      <button onClick={toggleSidebar} className="p-2 m-2">
        <TbArrowBackUp size={30} />
      </button>
      <nav className="mt-4 flex flex-col h-[calc(100%-85px)] justify-between">
        <ul className="flex flex-col space-y-4 p-4">
          {isLoggedIn ? <div className="mx-auto text-xl font-bold">Hi {user?.username}</div> : null}
          <li className="text-center shadow-sm text-xl">
            <Link to="/home" onClick={toggleSidebar} className="flex gap-2 justify-center items-center">
              <IoHomeOutline />
              Home
            </Link>
          </li>
          {isLoggedIn ? null : (
            <li className="text-center shadow-sm text-xl">
              <Link to="/login" onClick={toggleSidebar} className="flex gap-2 justify-center items-center">
                <CiLogin /> Login
              </Link>
            </li>
          )}

          {isLoggedIn && user.username != "guest" ? (
            <li className="text-center shadow-sm text-xl">
              <Link to="/stats" onClick={toggleSidebar} className="flex gap-2 justify-center items-center">
                <IoIosStats />
                Stats
              </Link>
            </li>
          ) : null}
        </ul>

        {isLoggedIn && user.username != "guest" ? (
          <ul className=" flex flex-col space-y-4  p-4">
            <li className="text-center shadow-sm text-xl">
              <Link
                to="/login"
                onClick={() => {
                  logout();
                  toggleSidebar();
                }}
                className="flex gap-2 justify-center items-center"
              >
                <TbLogout2 />
                Log out
              </Link>
            </li>
          </ul>
        ) : null}
      </nav>
    </div>
  );
}

export default Sidebar;
