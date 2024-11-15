const StatsRow = ({ stats }) => {
  //   console.log(stats);

  return (
    <li className="flex justify-between bg-gray-400/70 rounded-md mb-1 px-2 hover:bg-gray-500/50 cursor-pointer transition-colors duration-200">
      <p className="flex gap-5">
        <span>Questions:{stats.totalQuestions}</span>
        <span> Mistakes:{stats.wrongAnswers}</span>
        <span>Time:{stats.totalTime}s </span>
      </p>
      <span>&rarr;</span>
    </li>
  );
};

export default StatsRow;
