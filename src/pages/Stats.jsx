import StatsRow from "../components/StatsRow";
import { useStats } from "../hooks/useStats";

function Stats() {
  const { stats, loading, error } = useStats();

  const allQuestions = stats?.reduce((acc, current) => acc + current.totalQuestions, 0) || 0;
  const mistakes = stats?.reduce((acc, current) => acc + current.wrongAnswers, 0) || 0;

  let lastStats = [];

  if (stats && stats.length > 9) {
    lastStats = stats.slice(0, 10);
  } else if (stats) {
    lastStats = stats;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="bg-gray-400/70 font-mono mx-auto backdrop-blur-sm border-[5px] rounded-[20px] drop-shadow-[0_35px_35px_rgba(0,0,0,0.8)] md:w-2/3 w-[80%] max-w-[500px] h-3/4 mt-8 p-6 flex flex-col text-white">
      <h1 className="mx-auto">Your Stats</h1>
      <p>You answered {allQuestions} questions</p>
      <p>You make {mistakes} mistakes</p>
      {stats && (
        <ol className="flex flex-col overflow-auto">
          {lastStats.map((game, i) => (
            <StatsRow key={i} stats={game} />
          ))}
        </ol>
      )}
    </div>
  );
}

export default Stats;
