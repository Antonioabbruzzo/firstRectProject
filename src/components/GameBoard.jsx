export default function GameBoard({ onSelectSquare, board }) {
  // const [gameBoard, setGameBoard] = useState(initialGameBox);

  // function handleSelect(row, col) {
  //   setGameBoard((prevState) => {
  //     // Crea una copia profonda del gameBoard
  //     const updatedBoard = prevState.map((innerArray) => [...innerArray]);
  //     // Modifica la copia aggiornata
  //     updatedBoard[row][col] = playerSymbolActive;
  //     return updatedBoard;
  //   });
  //   onSelectSquare();
  // }

  return (
    <ol id="game-board">
      {board.map((row, index) => (
        <li key={index}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => onSelectSquare(index, colIndex)}
                  disabled={playerSymbol !== null} //cosi facendo permettiamo un solo click sul bottone
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
