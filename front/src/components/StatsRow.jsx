const StatsRow = ({ stats, id, isExpanded, onToggleExpand }) => {
  const handleClick = () => {
    onToggleExpand(id);
  };
  console.log(stats);

  return (
    <li
      onClick={handleClick}
      className={`text-xl min-w-[160px] relative bg-gray-400/70 border rounded-md mb-1 px-2 hover:bg-gray-500/50 cursor-pointer transition-all duration-200 ${
        isExpanded ? "h-48" : "h-auto"
      }`}
    >
      <p
        className={`${
          isExpanded && "flex-col"
        } flex gap-x-3  sm:gap-x-5 gap-y-2 py-2 flex-wrap mr-2`}
      >
        <span>Questions: {stats.totalQuestions}</span>
        <span>Mistakes: {stats.wrongAnswers}</span>
        {isExpanded && (
          <>
            <span>Total time: {stats.totalTime}</span>
            <span>
              Avarage time per question: {stats.averageTimePerQuestion}
            </span>
            <span>Date: {stats.date}</span>
          </>
        )}
      </p>
      <span
        className={`absolute top-2 right-2 transition-all duration-300 ${
          isExpanded && "rotate-90"
        }`}
      >
        &rarr;
      </span>
    </li>
  );
};

export default StatsRow;
