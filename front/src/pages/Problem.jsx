import { useEffect, useState } from "react";
import Keyboard from "../components/Keyboard";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
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
  const { isLoggedIn } = useAuth();

  async function getQuestion() {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8080/api/question", {
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

  if (correctAnswers < 5) {
    return (
      <>
        {isGameLaunched ? (
          <>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div className="h-6 w-[200px] mx-auto mt-3 border-2 border-blue-800/85">
              <div
                className="bg-lime-500 h-full transition-all duration-500 "
                style={{
                  width: `${(correctAnswers / 5) * 100}%`,
                }}
              ></div>
            </div>
            <div className="text-6xl mx-auto pt-3">{question.Operation}</div>
            <div className="h-16 mx-auto font-extrabold text-gray-600 text-6xl">
              {answer || "?"}
            </div>
            <div className="mt-10">
              <Keyboard onKeyPress={handleKeyPress} />
            </div>
          </>
        ) : (
          <div className="mx-auto text-center">
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
      </>
    );
  }

  // Game result
  if (correctAnswers > 4) {
    const totalTime = ((new Date() - startTime) / 1000).toFixed(2);
    return (
      <div className="mx-auto mt-5 text-center">
        <h1 className="text-5xl font-bold">Game Summary</h1>
        <div className="mt-4 text-2xl">
          <p>
            <strong>Time Taken:</strong> {totalTime} seconds
          </p>
          <p>
            <strong>Correct Answers:</strong> {correctAnswers}
          </p>
          <p>
            <strong>Mistakes Made:</strong> {mistakes}
          </p>
          <p>
            <strong>Feedback:</strong>{" "}
            {correctAnswers >= 5 ? "Great job!" : "Keep practicing!"}
          </p>
        </div>
        <button
          onClick={() => {
            setCorrectAnswers(0);
            setMistakes(0);
            setIsGameLaunched(false);
            setCountdown(3);
            setStartTime(null);
          }}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Play Again
        </button>
        <div className="flex flex-col items-center">
          <p className="mt-10 text-2xl mx-auto p-3">Back to main menu</p>
          <Link to="/">
            <FaArrowLeft size={28} className="cursor-pointer" />
          </Link>
        </div>
      </div>
    );
  }
}

export default Problem;
