import { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function App() {
  const [solution, setSolution] = useState("");
  const hasFetched = useRef(false); // Prevents double fetch

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchWords = async () => {
      try {
        const res = await axios.get(
          "https://corsproxy.io/?https://api.frontendexpert.io/api/fe/wordle-words"
        );
        const words = res.data;

        if (Array.isArray(words) && words.length > 0) {
          const randomWord = words[Math.floor(Math.random() * words.length)];
          setSolution(randomWord.toLowerCase());
        } else {
          console.error("Word list is empty or invalid.");
        }
      } catch (error) {
        console.error("Error fetching word list:", error);
      }
    };

    fetchWords();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Wordle</h1>
      <Table />
      {solution ? (
        <p className="mt-4 text-gray-400">[Dev] Solution: {solution}</p>
      ) : (
        <p className="text-gray-500">Loading word...</p>
      )}
    </div>
  );
}



function Table() {
  const rows = 6;
  const cols = 5;

  return (
    <div className="grid gap-2">
      {[...Array(rows)].map((_, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-5 gap-2">
          {[...Array(cols)].map((_, colIndex) => (
            <input
              key={`${rowIndex}-${colIndex}`}
              type="text"
              maxLength="1"
              className="tile w-14 h-14 text-center text-2xl font-bold uppercase border border-gray-700 bg-gray-800 text-white focus:outline-none"
            />
          ))}
        </div>
      ))}
    </div>
  );
}
