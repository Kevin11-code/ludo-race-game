import { useState } from "react";
import DiceImage1 from "./images/Dice1.png";
import DiceImage2 from "./images/Dice2.png";
import DiceImage3 from "./images/Dice3.png";
import DiceImage4 from "./images/Dice4.png";
import DiceImage5 from "./images/Dice5.png";
import DiceImage6 from "./images/Dice6.png";
import Boy from "./images/boy.png";
import Girl from "./images/girl.png";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TourIcon from "@mui/icons-material/Tour";

let count = false;
function App() {
  const diceImages = [
    DiceImage1,
    DiceImage2,
    DiceImage3,
    DiceImage4,
    DiceImage5,
    DiceImage6,
  ];

  const [image, setNewImage] = useState(diceImages[0]);
  const [won, setWon] = useState<string>();
  const [player1, setPlayer1] = useState({
    name: "Aman Singh",
    score: 0,
    position: -10,
  });
  const [player2, setPlayer2] = useState({
    name: "Ansi Singh",
    score: 0,
    position: -10,
  });

  const newGame = () => {
    setNewImage(diceImages[0]);
    setPlayer1((prev) => ({
      ...prev,
      score: 0,
      position: -10,
    }));
    setPlayer2((prev) => ({
      ...prev,
      score: 0,
      position: -10,
    }));
    count = false;
    setWon("");
  };

  const rollDice = () => {
    // Generate random number
    var randomNum = Math.floor(Math.random() * 6);
    setNewImage(diceImages[randomNum]);
    if (player1.score + randomNum + 1 >= 50 && !count) {
      setWon(player1.name);
      console.log(won);
      setPlayer1((prev) => ({
        ...prev,
        score: 50,
        position: 305,
      }));
    } else if (player2.score + randomNum + 1 >= 50 && count) {
      setWon(player2.name);
      console.log(won);
      setPlayer2((prev) => ({
        ...prev,
        score: 50,
        position: 305,
      }));
    } else {
      if (!count) {
        setPlayer1((prev) => {
          return {
            ...prev,
            position: ((prev.score + randomNum + 1) * 315) / 50 - 10,
            score: prev.score + randomNum + 1,
          };
        });
        count = !count;
      } else {
        setPlayer2((prev) => {
          return {
            ...prev,
            position: ((prev.score + randomNum + 1) * 315) / 50 - 10,
            score: prev.score + randomNum + 1,
          };
        });

        count = !count;
      }
    }
  };

  const styled1 = {
    left: player1.position.toString() + "px",
  };
  const styled2 = {
    left: player2.position.toString() + "px",
  };

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center space-y-7">
      <h1 className="text-5xl font-bold text-gray-900">Ludo Race Game</h1>

      <div className="flex flex-col bg-gray-900 h-[33rem] w-96 p-10 text-white rounded-3xl">
        <div className="h-full space-y-7 mt-3">
          <div className="flex flex-col">
            <div className="relative items-center bg-slate-5 h-8">
              <LocationOnIcon className="absolute text-yellow-500 bottom-[2px] left-[-12px]" />
              <TourIcon className="absolute text-blue-600 bottom-[2px] right-[-12px]" />

              <img
                src={Boy}
                alt="boy"
                className={`absolute h-8 w-5 left-[-10px] bottom-[5px]`}
                style={styled1}
              />
              <hr className="absolute bottom-0 h-1 bg-white w-[100%] border-none rounded-md " />
            </div>
            <div className="text-sm self-end font-bold">
              {50 - player1.score} steps left
            </div>
          </div>
          <div className="flex flex-col">
            <div className="relative items-center bg-slate-5 h-8">
              <LocationOnIcon className="absolute text-yellow-500 bottom-[2px] left-[-12px]" />
              <TourIcon className="absolute text-blue-600 bottom-[2px] right-[-12px]" />

              <img
                src={Girl}
                alt="girl"
                className={`absolute h-8 w-5 left-[-10px] bottom-[5px]`}
                style={styled2}
              />
              <hr className="absolute bottom-0 h-1 bg-white w-[100%] border-none rounded-md " />
            </div>
            <div className="text-sm self-end font-bold">
              {50 - player2.score} steps left
            </div>
          </div>
        </div>

        {won && (
          <div className="text-3xl font-light rounded-3xl py-2 text-white text-center">
            {won} Won!!!
          </div>
        )}
        {/* Scores and Dice bar */}
        <div className="flex justify-between text-white space-x-3 mt-8">
          <div className="bg-slate-50 text-black rounded-2xl p-3 max-w-[30%]">
            <div className="flex flex-col items-center">
              <img src={Boy} className="h-12 w-10" alt="Aman Singh img" />
              <h2 className="font-bold">{player1.name}</h2>
              <h3 className="text-4xl">{player1.score}</h3>
            </div>
          </div>
          {/* Dice and button */}
          <div className="flex flex-col items-center space-y-6 justify-center">
            <img className="h-12 w-12 rounded-2xl" src={image} alt="dice"></img>
            {player1.score >= 50 || player2.score >= 50 ? (
              <button
                type="button"
                className="bg-blue-500 font-bold rounded-3xl px-2 py-1 text-sm"
                onClick={newGame}
              >
                New Game
              </button>
            ) : (
              <button
                type="button"
                className="bg-teal-200 text-black font-extrabold rounded-3xl px-2 py-1 text-sm"
                onClick={rollDice}
              >
                Roll Dice
              </button>
            )}
          </div>
          <div className="bg-slate-50 text-black rounded-2xl p-3 max-w-[30%]">
            <div className="flex flex-col items-center">
              <img src={Girl} className="h-12 w-10" alt="Ansi Singh img" />
              <h2 className="font-bold">{player2.name}</h2>
              <h3 className="text-4xl">{player2.score}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
