import { useEffect, useState } from "react";
import Keyboard from "../components/Keyboard";

function Problem() {
  const [question, setQuestion] = useState({ Operation: "2 + 2" });
  const [error, setError] = useState(null);

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
        setError(err.message); // Zapisanie błędu, jeśli wystąpił
        console.error(err);
      }
    }

    getQuestion();
  }, []);

  return (
    <>
      {error && <p className="text-red-500">{error}</p>}
      <div className="text-6xl mx-auto pt-10">{question.Operation}</div>
      <div className="h-16 mx-auto font-extrabold text-gray-600 text-6xl">?</div>
      <div className="mt-10">
        <Keyboard />
      </div>
    </>
  );
}

export default Problem;
