import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Home() {
  const { user } = useAuth();

  return (
    <div className="bg-gray-400/70 mx-auto backdrop-blur-sm border-[5px] rounded-[20px] drop-shadow-[0_35px_35px_rgba(0,0,0,0.8)]  md:w-2/3 w-[80%] max-w-[500px] h-3/4 mt-8 p-6 flex flex-col text-white">
      {user.username == "admin" ? <div className="mx-auto text-xl font-bold">You play as a guest</div> : <div className="mx-auto text-xl font-bold">Hi {user?.username}</div>}
      <div className="flex justify-center gap-2 sm:gap-5 mx-2 sm:mt-10 mt-3 flex-col items-center overflow-auto">
        {user.username == "admin" ? (
          <Link to="/login">
            <div className="cursor-pointer sm:w-48 max-w-[400px] bg-gray-500 p-2  text-white font-Inconsolata  rounded-xl shadow-2xl border-2  hover:shadow-[inset_-12px_-8px_40px_#46464620] w-[120px]">
              <h1 className="text-center font-extrabold bg-gray-500">Log in</h1>
              <p className="text-center mt-2"></p>
              <span className="flex justify-end p-2"></span>
            </div>
          </Link>
        ) : null}
        <Link to="/game">
          <div className="cursor-pointer sm:w-48 max-w-[400px] bg-gray-500 p-2  text-white font-Inconsolata  rounded-xl shadow-2xl border-2  hover:shadow-[inset_-12px_-8px_40px_#46464620] w-[120px]">
            <h1 className="text-center font-extrabold bg-gray-500">Play</h1>
            <p className="text-center mt-2"></p>
            <span className="flex justify-end p-2"></span>
          </div>
        </Link>
        <Link to="/stats">
          <div className="cursor-pointer sm:w-48 max-w-[400px] bg-gray-500 p-2  text-white font-Inconsolata  rounded-xl shadow-2xl border-2  hover:shadow-[inset_-12px_-8px_40px_#46464620] w-[120px]">
            <h1 className="text-center font-extrabold bg-gray-500">Stats</h1>
            <p className="text-center mt-2"></p>
            <span className="flex justify-end p-2"></span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Home;
