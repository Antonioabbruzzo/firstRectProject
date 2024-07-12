import { useState } from "react";

export default function Player({
  initialName,
  symbol,
  isActive,
  onChangeName,
}) {
  const [playerName, setplayerName] = useState(initialName);
  const [isEditing, setEditing] = useState(false);

  function editPlayer() {
    setEditing((edit) => !edit);
    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  }

  function handleName(e) {
    setplayerName(e.target.value);
  }

  let content = <span className="player-name"> {playerName}</span>;
  let buttonCaption = "edit";
  if (isEditing) {
    content = <input type="text" value={playerName} onChange={handleName} />;
    buttonCaption = "save";
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {content}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={editPlayer}>{buttonCaption}</button>
    </li>
  );
}
