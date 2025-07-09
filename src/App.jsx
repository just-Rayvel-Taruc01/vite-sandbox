import { useEffect, useRef, useState } from "react";
import axios from "axios";

const ROWS = 6;
const COLS = 5;

export default function App() {
  const [solution, setSolution] = useState("");
  const [guesses, setGuesses] = useState(Array.from({ length: ROWS }, () => Array(COLS).fill("")));
  const [currentRow, setCurrentRow] = useState(0);
  const [colors, setColors] = useState(Array.from({ length: ROWS }, () => Array(COLS).fill("")));
  const inputRefs = useRef([]);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const res = await axios.get("https://corsproxy.io/?https://api.frontendexpert.io/api/fe/wordle-words");
        const words = res.data;
        const randomWord = words[Math.floor(Math.random() * words.length)].toLowerCase();
        setSolution(randomWord);
      } catch (error) {
        console.error("Error fetching word list:", error);
      }
    };

    fetchWords();
  }, []);

  const handleChange = (row, col, value) => {
    if (row !== currentRow || !/^[a-zA-Z]?$/.test(value)) return;

    const newGuesses = guesses.map((r) => [...r]);
    newGuesses[row][col] = value.toUpperCase();
    setGuesses(newGuesses);

    // Move to next tile if available
    if (value && col < COLS - 1) {
      inputRefs.current[row][col + 1]?.focus();
    }
  };

  const handleKeyDown = (e, row, col) => {
    if (row !== currentRow) return;

    if (e.key === "Backspace") {
      if (guesses[row][col]) return; // Don't move if current tile has a letter
      if (col > 0) {
        inputRefs.current[row][col - 1]?.focus();
      }
    } else if (e.key === "Enter") {
      submitGuess();
    }
  };

  const submitGuess = () => {
    const guess = guesses[currentRow].join("").toLowerCase();
    if (guess.length !== COLS) return;

    const newColors = [...colors];
    const solutionLetters = solution.split("");
    const guessLetters = guess.split("");

    const rowColors = Array(COLS).fill("gray");

    // Green pass
    const used = Array(COLS).fill(false);
    for (let i = 0; i < COLS; i++) {
      if (guessLetters[i] === solutionLetters[i]) {
        rowColors[i] = "green";
        used[i] = true;
      }
    }

    // Yellow pass
    for (let i = 0; i < COLS; i++) {
      if (rowColors[i] !== "green") {
        for (let j = 0; j < COLS; j++) {
          if (!used[j] && guessLetters[i] === solutionLetters[j]) {
            rowColors[i] = "yellow";
            used[j] = true;
            break;
          }
        }
      }
    }

    newColors[currentRow] = rowColors;
    setColors(newColors);

    // Win check
    if (guess === solution) {
      alert("🎉 Correct!");
    } else if (currentRow === ROWS - 1) {
      alert(`❌ Game Over. The word was: ${solution}`);
    } else {
      setCurrentRow(currentRow + 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-6">Wordle Clone</h1>
      <div className="grid gap-2">
        {guesses.map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-5 gap-2">
            {row.map((letter, colIndex) => {
              const color = colors[rowIndex][colIndex];
              const bgColor =
                color === "green"
                  ? "bg-green-600"
                  : color === "yellow"
                  ? "bg-yellow-500"
                  : color === "gray"
                  ? "bg-gray-800"
                  : "bg-gray-900";

              return (
                <input
                  key={`${rowIndex}-${colIndex}`}
                  ref={(el) => {
                    if (!inputRefs.current[rowIndex]) {
                      inputRefs.current[rowIndex] = [];
                    }
                    inputRefs.current[rowIndex][colIndex] = el;
                  }}
                  type="text"
                  maxLength={1}
                  value={letter}
                  disabled={rowIndex > currentRow}
                  onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
                  className={`tile w-14 h-14 text-center text-2xl font-bold uppercase border border-gray-600 text-white focus:outline-none ${bgColor}`}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}