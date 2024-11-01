import { CiMinimize1 } from "react-icons/ci";

function Keyboard() {
  return (
    <div className="relative w-full max-w-lg mx-auto p-3  bg-gray-300 rounded-lg shadow-md">
      <div className="grid grid-cols-3 gap-2">
        <button className="key">1</button>
        <button className="key">2</button>
        <button className="key">3</button>
        <button className="key">4</button>
        <button className="key">5</button>
        <button className="key">6</button>
        <button className="key">7</button>
        <button className="key">8</button>
        <button className="key">9</button>
        <button className="key clear-key">clear</button>
        <button className="key">0</button>
        <button className="key backspace-key">backspace</button>
      </div>
    </div>
  );
}

export default Keyboard;
