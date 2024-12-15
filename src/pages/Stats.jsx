import { useEffect, useState } from "react";
import StatsRow from "../components/StatsRow";
import { useStats } from "../hooks/useStats";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import Spinner from "../components/Spinner";

function Stats() {
  const { stats, loading, error } = useStats();
  const [expandedId, setExpandedId] = useState(null);
  const { user, fetchUserData } = useAuth();
  const handleToggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const allQuestions = stats?.reduce((acc, current) => acc + current.totalQuestions, 0) || 0;
  const mistakes = stats?.reduce((acc, current) => acc + current.wrongAnswers, 0) || 0;

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="relative h-full">
      <div className="absolute inset-0 backdrop-blur-sm -z-10"></div>
      <div className="bg-gray-400/70 font-mono mx-auto border-[5px] rounded-[20px] drop-shadow-[0_35px_35px_rgba(0,0,0,0.8)] md:w-2/3 w-[80%] max-w-[500px] h-5/6 mt-8 p-6 flex flex-col text-white z-10 text-2xl">
        {loading ? (
          <div className="mx-auto">
            <Spinner />
          </div>
        ) : (
          <>
            <h1 className="mx-auto">Your Stats</h1>
            <p className="mt-6">You are lvl {user.lvl} </p>
            <p>Answered: {allQuestions} questions</p>
            <p>Mistakes made: {mistakes} </p>
            {stats && (
              <ol className="overflow-auto">
                {stats.reverse().map((game, i) => (
                  <StatsRow key={game.id || `game-${i}`} stats={game} id={game.id || i} isExpanded={expandedId === (game.id || i)} onToggleExpand={handleToggleExpand} />
                ))}
              </ol>
            )}
          </>
        )}
        <div className="flex flex-col items-center">
          <p className="mt-3 text-md mx-auto p-3 text-white">Back to main menu</p>
          <Link to="/">
            <FaArrowLeft size={24} className="cursor-pointer text-white" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Stats;
