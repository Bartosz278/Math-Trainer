import { useEffect, useState } from "react";
import Keyboard from "../components/Keyboard";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import sendGameStats from "../helpers/sendGameStats";
import { useAuth } from "../context/AuthContext";

function Problem() {
  const [question, setQuestion] = useState({});
  const [error, setError] = useState(null);
  const [answer, setAnswer] = useState("");
  const [isGameLaunched, setIsGameLaunched] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [gameFinished, setGameFinished] = useState(false);
  const { user } = useAuth();

  async function getQuestion() {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("https://mathtrainer.onrender.com/api/question", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to download question ");
      }
      const data = await res.json();
      setQuestion(data);
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  }

  useEffect(() => {
    getQuestion();
  }, []);

  useEffect(() => {
    if (!isGameLaunched && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1300);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setGameFinished(false);
      setIsGameLaunched(true);
      setStartTime(new Date());
    }
  }, [countdown, isGameLaunched]);

  // COMPARING QUESTION
  useEffect(() => {
    if (question.Result === null || question.Result === undefined) return; //

    if (String(answer) === String(question.Result)) {
      setCorrectAnswers((correctAnswers) => correctAnswers + 1);

      const timeout = setTimeout(() => {
        setAnswer("");
        getQuestion();
      }, 200);

      return () => clearTimeout(timeout);
    } else if (answer !== "" && String(answer) !== String(question.Result)) {
      setMistakes((mistakes) => mistakes + 1);
    }
  }, [answer, question.Result]);

  // Keyboard input handler
  const handleKeyDown = (event) => {
    const { key } = event;
    if (key === " ") return;
    if (key === "Backspace") {
      setAnswer((prev) => prev.slice(0, -1));
    } else if (key === "Escape" || key.toLowerCase() === "c") {
      setAnswer("");
    } else if (!isNaN(key)) {
      setAnswer((prev) => prev + key);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [answer]);

  const handleKeyPress = (value) => {
    if (value === "clear") {
      setAnswer("");
    } else if (value === "backspace") {
      setAnswer((prev) => prev.slice(0, -1));
    } else {
      setAnswer((prev) => prev + value);
    }
  };

  useEffect(() => {
    if (correctAnswers > 4 && user.username != "admin") {
      const totalTime = ((new Date() - startTime) / 1000).toFixed(2);
      const totalQuestions = correctAnswers;
      const averageTimePerQuestion = (totalTime / totalQuestions).toFixed(2);
      const currentDate = new Date().toLocaleDateString("en-GB");

      const gameStats = {
        averageTimePerQuestion: parseFloat(averageTimePerQuestion),
        date: currentDate,
        totalQuestions,
        totalTime: parseFloat(totalTime),
        wrongAnswers: mistakes,
      };
      sendGameStats(gameStats);
    }
  }, [correctAnswers]);

  if (correctAnswers < 5) {
    return (
      <div className="bg-gray-400/70 mx-auto backdrop-blur-sm border-[5px] rounded-[20px] drop-shadow-[0_35px_35px_rgba(0,0,0,0.8)]  md:w-2/3 w-[80%] max-w-[600px] h-[80%] max-h-[700px] min-h-[550px] mt-8 p-6 flex flex-col ">
        {isGameLaunched ? (
          <>
            {error && <p className="text-red-500 text-center">{error}</p>}

            <div className="h-6 w-[200px] mx-auto mt-3 min-h-[20px] border-2 border-white rounded-md">
              <div
                className="bg-blue-900 h-full transition-all duration-500 rounded-md"
                style={{
                  width: `${(correctAnswers / 5) * 100}%`,
                }}
              ></div>
            </div>
            <div className="text-6xl mx-auto pt-3  text-white">
              {question.Operation}
            </div>
            <div className="h-16 mx-auto font-extrabold text-white text-6xl">
              {answer || "?"}
            </div>
            <div className="mt-10">
              <Keyboard onKeyPress={handleKeyPress} />
            </div>
          </>
        ) : (
          <div className="mx-auto text-center text-white">
            {countdown > 0 ? (
              <>
                <h1 className="mt-10">The game will start in </h1>
                <h2
                  className="text-[78px] font-bold animate-countdown mt-2"
                  key={countdown}
                >
                  {countdown}
                </h2>
              </>
            ) : null}
          </div>
        )}
      </div>
    );
  }

  // Game result
  if (correctAnswers > 4) {
    const totalTime = ((new Date() - startTime) / 1000).toFixed(2);
    const averageTimePerQuestion = (
      totalTime /
      (correctAnswers + mistakes)
    ).toFixed(2);
    return (
      <div className="bg-gray-400/70 mx-auto backdrop-blur-sm border-[5px] rounded-[20px] drop-shadow-[0_35px_35px_rgba(0,0,0,0.8)]  md:w-2/3 w-[80%] max-w-[600px] h-3/4 mt-8 p-6 flex flex-col">
        <div className="mx-auto text-center h-full flex flex-col justify-between max-h-[400px]">
          <div className=" text-2xl text-white">
            <h1 className="text-5xl font-bold text-white">Game Summary</h1>
            <p>
              <strong>Time Taken:</strong> {totalTime} s
            </p>
            <p>
              <strong>Correct Answers:</strong> {correctAnswers}
            </p>
            <p>
              <strong>Mistakes Made:</strong> {mistakes}
            </p>
            <p>Average Time Per Question: {averageTimePerQuestion}s</p>
          </div>
          <button
            onClick={() => {
              setCorrectAnswers(0);
              setMistakes(0);
              setIsGameLaunched(false);
              setCountdown(3);
              setStartTime(null);
            }}
            className="mt-4 px-4 py-2 bg-blue-950 text-white border text-xl rounded"
          >
            Play Again
          </button>
          <div className="flex flex-col items-center">
            <p className="mt-3 text-2xl mx-auto p-3 text-white">
              Back to main menu
            </p>
            <Link to="/">
              <FaArrowLeft size={48} className="cursor-pointer text-white" />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Problem;
