import { Link } from "react-router-dom";
import { TbArrowBackUp } from "react-icons/tb";
import { MdOutlineAccountCircle } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { IoIosStats } from "react-icons/io";

function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <div className={` fixed top-0 left-0 h-full w-44 bg-blue-500 text-white transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out z-50`}>
      <button onClick={toggleSidebar} className="p-2 m-2">
        <TbArrowBackUp size={30} />
      </button>
      <nav className="mt-4">
        <ul className="flex flex-col space-y-4 p-4 justify-center">
          <li className="text-center shadow-sm text-xl">
            <Link to="/home" onClick={toggleSidebar} className="flex gap-2 justify-center items-center">
              <IoHomeOutline />
              Home
            </Link>
          </li>
          <li className="text-center shadow-sm text-xl">
            <Link to="/login" onClick={toggleSidebar} className="flex gap-2 justify-center items-center">
              <MdOutlineAccountCircle />
              Login
            </Link>
          </li>
          <li className="text-center shadow-sm text-xl">
            <Link to="/stats" onClick={toggleSidebar} className="flex gap-2 justify-center items-center">
              <IoIosStats />
              Stats
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
