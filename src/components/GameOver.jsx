export default function GameOver({ winner, onRestart }) {
  return (
    <div id="game-over">
      <h2>Gamer over!</h2>
      {winner && <p>{winner} won! </p>}
      {!winner && <p>it's a DROW</p>}
      <p>
        <button onClick={onRestart}>RESTART THE GAME!</button>
      </p>
    </div>
  );
}
