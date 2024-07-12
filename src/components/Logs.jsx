export default function Logs({ turns }) {
  return (
    <ol id="log">
      {turns.map((turns) => (
        <li key={`${turns.square.row}${turns.square.col}`}>
          {turns.player} selected riga:{turns.square.row}, colonna:
          {turns.square.col}
        </li>
      ))}
    </ol>
  );
}
