import React, { useState } from "react";
import MapRenderer from "../components/Map";
import { useLocation } from "react-router-dom";

const GamePage = () => {
  const location = useLocation();
  const selectedHero = location.state?.hero || null;

  const MAP_WIDTH = 5; // Número de columnas
  const MAP_HEIGHT = 5; // Número de filas

  // Estado inicial del personaje en (0,0)
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMove = (direction) => {
    setPosition((prevPosition) => {
      let newX = prevPosition.x;
      let newY = prevPosition.y;

      switch (direction) {
        case "up":
          if (newY > 0) newY -= 1;
          break;
        case "down":
          if (newY < MAP_HEIGHT - 1) newY += 1;
          break;
        case "left":
          if (newX > 0) newX -= 1;
          break;
        case "right":
          if (newX < MAP_WIDTH - 1) newX += 1;
          break;
        default:
          break;
      }

      console.log(`Moved to: (${newX}, ${newY})`);
      return { x: newX, y: newY };
    });
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ flex: "3", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", borderRight: "2px solid black" }}>
        <div style={{ width: "90%", height: "80%", border: "2px solid black" }}>
          <MapRenderer playerPosition={position} />
        </div>
      </div>
      
      <div style={{ flex: "2", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <h1>Hero Info</h1>
        {selectedHero ? (
          <div style={{ textAlign: "left", border: "1px solid black", padding: "10px", width: "80%" }}>
            <p><strong>Name:</strong> {selectedHero.name}</p>
            <p><strong>Level:</strong> {selectedHero.level}</p>
            <p><strong>HP:</strong> {selectedHero.maxHP}</p>
            <p><strong>Gold:</strong> {selectedHero.gold}</p>
            <p><strong>ATK:</strong> {selectedHero.ATK}</p>
          </div>
        ) : (
          <p>No hero selected</p>
        )}

        <p><strong>Position:</strong> ({position.x}, {position.y})</p>

        <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <button onClick={() => handleMove("up")} style={buttonStyle}>⬆️</button>
          <div style={{ display: "flex", gap: "40px" }}>
            <button onClick={() => handleMove("left")} style={buttonStyle}>⬅️</button>
            <button onClick={() => handleMove("right")} style={buttonStyle}>➡️</button>
          </div>
          <button onClick={() => handleMove("down")} style={buttonStyle}>⬇️</button>
        </div>
      </div>
    </div>
  );
};

const buttonStyle = {
  width: "40px", height: "40px", fontSize: "20px",
  display: "flex", justifyContent: "center", alignItems: "center",
  textAlign: "center", margin: "5px"
};

export default GamePage;
