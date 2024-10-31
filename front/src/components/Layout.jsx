import { useState } from "react";
import Header from "./Header";
import Problem from "./Problem";
import Sidebar from "./Sidebar";

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex flex-col flex-grow">
        <Header toggleSidebar={toggleSidebar} />
        <Problem />
      </div>
    </div>
  );
}

export default Layout;
