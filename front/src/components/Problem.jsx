import { useEffect, useState } from "react";

function Problem() {
  const [question, setQuestion] = useState({});
  useEffect(() => {
    async function getQuestion() {
      const res = await fetch("http://localhost:8080/api/question");
      const data = await res.json();
      setQuestion(data);
    }
    getQuestion();
  }, []);
  return <div className="text-6xl m-auto p-10">{question.Operation}</div>;
}

export default Problem;
