import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { TbLogout2 } from "react-icons/tb";
import { useEffect } from "react";

function Home() {
  const { user, logout, stats, fetchUserData } = useAuth();
  const allQuestions = stats?.reduce((acc, current) => acc + current.totalQuestions, 0) || 0;

  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <div className="relative h-full">
      <div className="absolute inset-0 backdrop-blur-sm -z-10"></div>

      <div className="bg-gray-400/70 mx-auto  border-[5px] rounded-[20px] drop-shadow-[0_35px_35px_rgba(0,0,0,0.8)]  md:w-2/3 w-[80%] max-w-[500px] h-5/6 mt-8 p-3 flex flex-col  text-white">
        {user.username == "admin" ? (
          <div className="mx-auto text-xl font-bold">
            <p className="text-center">You play as a guest</p>
          </div>
        ) : (
          <div className="mx-auto text-xl font-bold flex flex-col items-center">
            <p>Hi {user?.username}</p>
            <p>You are lvl {user?.lvl}</p>
            <div className="h-6 w-[200px] mx-auto mt-3 min-h-[20px] border-2 border-white rounded-md">
              <div
                className="bg-blue-900 h-full transition-all duration-500 rounded-md"
                style={{
                  width: `${(user.questionOnThisLvl / (5 + user.lvl)) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        )}
        <div className="flex justify-between gap-2 sm:gap-5 mx-2 sm:mt-10 mt-6 flex-col items-center overflow-auto">
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
          {user.username != "admin" ? (
            <>
              <Link to="/stats">
                <div className="cursor-pointer sm:w-48 max-w-[400px] bg-gray-500 p-2  text-white font-Inconsolata  rounded-xl shadow-2xl border-2  hover:shadow-[inset_-12px_-8px_40px_#46464620] w-[120px]">
                  <h1 className="text-center font-extrabold bg-gray-500">Stats</h1>
                  <p className="text-center mt-2"></p>
                  <span className="flex justify-end p-2"></span>
                </div>
              </Link>

              <Link
                to="/login"
                onClick={() => {
                  logout();
                }}
                className="flex gap-2 justify-center items-center"
              >
                <TbLogout2 />
                Log out
              </Link>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Home;
