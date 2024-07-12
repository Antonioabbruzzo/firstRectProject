import Player from "./components/player";
import GameBoard from "./components/GameBoard";
import GameOver from "./components/GameOver";
import { useState } from "react";
import Logs from "./components/Logs";
import { WINNING_COMBINATIONS } from "./winning-combinantions";

const PLAYERS = { X: "Player1", O: "Players" };

const initialGameBox = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveGameBoard(gameTurns) {
  //derivando gameboard da gameBoard a app
  let gameBoard = [...initialGameBox.map((array) => [...array])]; //cosi creiamo una copia leggera e non profonda, cosi quando azzereremo arreremo la copia non l'ogirinale in memoria che rimarra vuoto di suo

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function deriveWinner(gameBoard, players) {
  let winner;

  for (const combinantions of WINNING_COMBINATIONS) {
    const firstSquare =
      gameBoard[combinantions[0].row][combinantions[0].column];
    const secondSquare =
      gameBoard[combinantions[1].row][combinantions[1].column];
    const thirdSquare =
      gameBoard[combinantions[2].row][combinantions[2].column];

    if (
      firstSquare &&
      firstSquare === secondSquare &&
      firstSquare === thirdSquare
    ) {
      winner = players[firstSquare];
    }
  }
  return winner;
}

//deriviamo ora lo stato tramite questa funzione all'esterno del componente
function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function App() {
  //const [activePlayer, setActivePlayer] = useState("X");
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS);
  // const [hasWinner, setAsWinner] = useState(false);
  const activePlayer = deriveActivePlayer(gameTurns);

  function handleNameChange(symbol, newName) {
    setPlayers((prevPlayer) => {
      return {
        ...prevPlayer,
        [symbol]: newName,
      };
    });
  }
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDrow = gameTurns.length === 9 && !winner;

  function handleSelecetSquare(rowIndex, colIndex) {
    //setActivePlayer((currentPlayer) => (currentPlayer === "X" ? "O" : "X"));
    setGameTurns((prevTurn) => {
      const currentPlayer = deriveActivePlayer(prevTurn);
      const updateTurn = [
        {
          square: {
            row: rowIndex,
            col: colIndex,
          },
          player: currentPlayer,
        },
        ...prevTurn,
      ];
      return updateTurn;
    });
  }

  function rematch() {
    setGameTurns([]); //cosi azzeriamo quello che c'è nell'array; ma non funziona perchè l'array è in memoria e per azzerarlo consieve creare una copia non profonda
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handleNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handleNameChange}
          />
        </ol>
        {(winner || hasDrow) && (
          <GameOver winner={winner} onRestart={rematch} />
        )}
        <GameBoard onSelectSquare={handleSelecetSquare} board={gameBoard} />
      </div>
      <Logs turns={gameTurns} />
    </main>
  );
}

export default App;
