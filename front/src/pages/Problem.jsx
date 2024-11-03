import { useEffect, useState } from "react";
import Keyboard from "../components/Keyboard";

function Problem() {
  const [question, setQuestion] = useState({ Operation: "2 + 2" });
  const [error, setError] = useState(null);
  const [answer, setAnswer] = useState("");

  useEffect(() => {
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
          throw new Error("Nie udało się pobrać pytania, spróbuj ponownie.");
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

  // Funkcja obsługująca naciśnięcia klawiszy klawiatury
  const handleKeyDown = (event) => {
    const { key } = event;
    if (key === " ") return;
    if (key === "Backspace") {
      setAnswer((prev) => prev.slice(0, -1));
    } else if (key === "Enter") {
      // Możesz dodać tutaj logikę zatwierdzania odpowiedzi
      console.log("Odpowiedź zatwierdzona:", answer);
    } else if (key === "Escape" || key.toLowerCase() === "c") {
      setAnswer(""); // Klawisz "Escape" lub "c" wyczyści odpowiedź
    } else if (!isNaN(key)) {
      // Sprawdzenie, czy naciśnięty klawisz jest cyfrą
      setAnswer((prev) => prev + key);
    }
  };

  // Dodaj nasłuchiwacz zdarzeń klawiatury podczas montowania komponentu
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      // Usuń nasłuchiwacz po odmontowaniu komponentu, aby uniknąć wycieków pamięci
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [answer]); // Dodanie answer do dependency array sprawi, że stan się zaktualizuje

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
      {error && <p className="text-red-500">{error}</p>}
      <div className="text-6xl mx-auto pt-10">{question.Operation}</div>
      <div className="h-16 mx-auto font-extrabold text-gray-600 text-6xl">{answer || "?"}</div>

      <div className="mt-10">
        <Keyboard onKeyPress={handleKeyPress} />
      </div>
    </>
  );
}

export default Problem;
