import React, { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { ipcRenderer } from "electron";

function copy(at: number) {
  return ipcRenderer.send("copy", at);
}

const Entry = ({ position, isSelected, value, metadata }) => {
  const onClick = () => copy(position);

  return (
    <div className="Entry" onClick={onClick} data-is-selected={isSelected}>
      <header>
        <h1>{metadata.type}</h1>
        <h2>{formatDistanceToNow(metadata.copiedAt)}</h2>
      </header>
      <div>{value}</div>
    </div>
  );
};

export default function App({ entries }) {
  const [position, setPosition] = useState(0);

  const onKeyUp = (event) => {
    event.preventDefault();

    switch (event.key) {
      case "ArrowLeft":
        return setPosition((current) => Math.max(0, current - 1));
      case "ArrowRight":
        return setPosition((current) => Math.min(current + 1, entries.length - 1));
      case "Enter":
        return copy(position);
      default:
        return;
    }
  };

  useEffect(() => {
    document.addEventListener("keyup", onKeyUp);

    return () => {
      document.removeEventListener("keyup", onKeyUp);
    };
  });

  return (
    <div className="App">
      <div className="App-Entries">
        {entries.map((entry, index) => (
          <Entry isSelected={index === position} position={index} key={index} {...entry} />
        ))}
      </div>
    </div>
  );
}
