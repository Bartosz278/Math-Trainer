import Header from "./Header";
import Login from "./Login";
import Problem from "./Problem";

function Layout() {
  return (
    <div className="flex flex-col justify-center">
      <Header />
      <Problem />
      <Login />
    </div>
  );
}

export default Layout;
