import { Link, Navigate } from "react-router-dom";
import { TbArrowBackUp } from "react-icons/tb";
import { MdOutlineAccountCircle } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { IoIosStats } from "react-icons/io";
import { TbLogout2 } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import { CiLogin } from "react-icons/ci";

import { useAuth } from "../context/AuthContext";

function Sidebar({ isOpen, toggleSidebar }) {
  const { isLoggedIn, logout, user } = useAuth();
  console.log(user);

  return (
    <div className={`fixed top-0 left-0 h-full w-44 bg-blue-500 text-white transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out z-50`}>
      <button onClick={toggleSidebar} className="p-2 m-2">
        <TbArrowBackUp size={30} />
      </button>
      <nav className="mt-4 flex flex-col h-[calc(100%-85px)] justify-between">
        <ul className="flex flex-col space-y-4 p-4">
          <div className="mx-auto text-xl font-bold">Hi {user.username}</div>
          <li className="text-center shadow-sm text-xl">
            <Link to="/home" onClick={toggleSidebar} className="flex gap-2 justify-center items-center">
              <IoHomeOutline />
              Home
            </Link>
          </li>
          {isLoggedIn ? (
            <li className="text-center shadow-sm text-xl">
              <Link to="/account" onClick={toggleSidebar} className="flex gap-2 justify-center items-center">
                <MdOutlineAccountCircle />
                Account
              </Link>
            </li>
          ) : (
            <li className="text-center shadow-sm text-xl">
              <Link to="/login" onClick={toggleSidebar} className="flex gap-2 justify-center items-center">
                <CiLogin /> Login
              </Link>
            </li>
          )}
          <li className="text-center shadow-sm text-xl">
            <Link to="/stats" onClick={toggleSidebar} className="flex gap-2 justify-center items-center">
              <IoIosStats />
              Stats
            </Link>
          </li>
        </ul>

        <ul className=" flex flex-col space-y-4  p-4">
          <li className="text-center shadow-sm text-xl">
            <Link to="/settings" onClick={toggleSidebar} className="flex gap-2 justify-center items-center">
              <IoSettingsOutline />
              Settings
            </Link>
          </li>
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
      </nav>
    </div>
  );
}

export default Sidebar;
