import { CiMinimize1 } from "react-icons/ci";

function Keyboard({ onKeyPress }) {
  const handleButtonClick = (value) => {
    onKeyPress(value); // Wywołaj callback z wartością klawisza
  };

  return (
    <div className="relative w-full max-w-lg mx-auto p-3 bg-gray-300 rounded-lg shadow-md">
      <div className="grid grid-cols-3 gap-2">
        <button className="key" onClick={() => handleButtonClick("1")}>
          1
        </button>
        <button className="key" onClick={() => handleButtonClick("2")}>
          2
        </button>
        <button className="key" onClick={() => handleButtonClick("3")}>
          3
        </button>
        <button className="key" onClick={() => handleButtonClick("4")}>
          4
        </button>
        <button className="key" onClick={() => handleButtonClick("5")}>
          5
        </button>
        <button className="key" onClick={() => handleButtonClick("6")}>
          6
        </button>
        <button className="key" onClick={() => handleButtonClick("7")}>
          7
        </button>
        <button className="key" onClick={() => handleButtonClick("8")}>
          8
        </button>
        <button className="key" onClick={() => handleButtonClick("9")}>
          9
        </button>
        <button className="key clear-key" onClick={() => handleButtonClick("clear")}>
          clear
        </button>
        <button className="key" onClick={() => handleButtonClick("0")}>
          0
        </button>
        <button className="key backspace-key" onClick={() => handleButtonClick("backspace")}>
          backspace
        </button>
      </div>
    </div>
  );
}

export default Keyboard;
