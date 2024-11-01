import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div className="flex justify-center gap-2 sm:gap-5 mx-2 sm:mt-10 mt-3 flex-col sm:flex-row items-center overflow-auto">
      <Link to="/login">
        <div className="cursor-pointer sm:w-48 max-w-[400px]  bg-custom-gradient font-Inconsolata   rounded shadow-2xl border-2 border-gray-900/35 hover:shadow-[inset_-12px_-8px_40px_#46464620]">
          <h1 className="text-center font-extrabold bg-gray-400/30">Log in</h1>
          <p className="text-center mt-2">to get the full version, check your stats and level up... </p>
          <span className="flex justify-center">
            <FaLongArrowAltRight size={48} />
          </span>
        </div>
      </Link>
      <Link to="/game">
        <div className="cursor-pointer sm:w-48 max-w-[400px] bg-custom-gradient font-Inconsolata   rounded shadow-2xl border-2 border-gray-900/35 hover:shadow-[inset_-12px_-8px_40px_#46464620]">
          <h1 className="text-center font-extrabold bg-gray-400/30">Play</h1>
          <p className="text-center mt-2"> Solve math problems. one game consists of 5 equations... </p>
          <span className="flex justify-center">
            <FaLongArrowAltRight size={48} />
          </span>
        </div>
      </Link>
      <Link to="/stats">
        <div className="cursor-pointer sm:w-48 max-w-[400px] bg-custom-gradient font-Inconsolata  rounded shadow-2xl border-2 border-gray-900/35 hover:shadow-[inset_-12px_-8px_40px_#46464620]">
          <h1 className="text-center font-extrabold bg-gray-400/30">Stats</h1>
          <p className="text-center mt-2">check your statistics, how quickly you solve tasks and more...</p>
          <span className="flex justify-center">
            <FaLongArrowAltRight size={48} />
          </span>
        </div>
      </Link>
    </div>
  );
}

export default Home;
