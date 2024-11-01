import { useEffect, useState } from "react";
import Keyboard from "../components/Keyboard";

function Problem() {
  const [question, setQuestion] = useState({ Operation: "2 + 2" });

  // ------------> IF SERVER WORKS PROPERLY AND USER IS LOGGED IN UNCOMMENT BELLOW <------

  // useEffect(() => {
  //   async function getQuestion() {
  //     const res = await fetch("http://localhost:8080/api/question");
  //     const data = await res.json();
  //     setQuestion(data);
  //     console.log(data.Operation);
  //   }
  //   getQuestion();
  // }, []);
  return (
    <>
      <div className="text-6xl mx-auto pt-10">{question.Operation}</div>
      <div className="h-16 mx-auto font-extrabold text-gray-600 text-6xl">?</div>
      <div className="mt-10">
        <Keyboard />
      </div>
    </>
  );
}

export default Problem;
