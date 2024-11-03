import { useEffect, useState } from "react";
import Keyboard from "../components/Keyboard";

function Problem() {
  const [question, setQuestion] = useState({ Operation: "2 + 2" });
  const [error, setError] = useState(null);
  const [answer, setAnswer] = useState(0);
  const [isGameLaunched, setIsGameLaunched] = useState(false);
  const [countdown, setCountdown] = useState(3); // Stan na odliczanie od 3 do 1

  useEffect(() => {
    // Pobieranie pytania z serwera
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

    getQuestion();
  }, []);

  useEffect(() => {
    if (!isGameLaunched && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1300);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setIsGameLaunched(true);
    }
  }, [countdown, isGameLaunched]);

  useEffect(() => {
    if (answer === question.Result) {
    }
  }, [answer, question]);

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

  return (
    <>
      {isGameLaunched ? (
        <>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="h-6 w-[200px] mx-auto mt-3 border-2 border-blue-800/85">
            <div className={`bg-lime-500 w-${answer}/5 h-full`}></div>
          </div>
          <div className="text-6xl mx-auto pt-3">{question.Operation}</div>
          <div className="h-16 mx-auto font-extrabold text-gray-600 text-6xl">{answer || "?"}</div>
          <div className="mt-10">
            <Keyboard onKeyPress={handleKeyPress} />
          </div>
        </>
      ) : (
        <div className="mx-auto text-center">
          {countdown > 0 ? (
            <>
              <h1 className="mt-10">The game will start in </h1>
              <h2 className="text-[78px] font-bold animate-countdown mt-2" key={countdown}>
                {countdown}
              </h2>
            </>
          ) : null}
        </div>
      )}
    </>
  );
}

export default Problem;
