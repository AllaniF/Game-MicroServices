import React, { useState } from "react";
import MapRenderer from "../components/MapRenderer";
import Character from "../components/Character";
import { useLocation } from "react-router-dom";

const GamePage = () => {
  const location = useLocation();
  const selectedHero = location.state?.hero || null;

  const MAP_WIDTH = 5;
  const MAP_HEIGHT = 5;

  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMove = (direction) => {
    setPosition((prev) => {
      let newX = prev.x;
      let newY = prev.y;

      switch (direction) {
        case "up": if (newY > 0) newY--; break;
        case "down": if (newY < MAP_HEIGHT - 1) newY++; break;
        case "left": if (newX > 0) newX--; break;
        case "right": if (newX < MAP_WIDTH - 1) newX++; break;
        default: break;
      }

      return { x: newX, y: newY };
    });
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ flex: "3", position: "relative", borderRight: "2px solid black" }}>
        <MapRenderer />
        <Character position={position} />
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

        {/* Posición del jugador debajo de la información del héroe */}
        <p><strong>Position:</strong> ({position.x}, {position.y})</p>

        {/* Controles de movimiento debajo de la información del héroe */}
        <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <button 
            onClick={() => handleMove("up")} 
            style={{ 
              width: "40px", height: "40px", fontSize: "20px", 
              display: "flex", justifyContent: "center", alignItems: "center", 
              textAlign: "center", marginBottom: "5px"
            }}>
            ⬆️
          </button>
          
          <div style={{ display: "flex", gap: "40px" }}>
            <button 
              onClick={() => handleMove("left")} 
              style={{ 
                width: "40px", height: "40px", fontSize: "20px", 
                display: "flex", justifyContent: "center", alignItems: "center", 
                textAlign: "center"
              }}>
              ⬅️
            </button>
            
            <button 
              onClick={() => handleMove("right")} 
              style={{ 
                width: "40px", height: "40px", fontSize: "20px", 
                display: "flex", justifyContent: "center", alignItems: "center", 
                textAlign: "center"
              }}>
              ➡️
            </button>
          </div>
          
          <button 
            onClick={() => handleMove("down")} 
            style={{ 
              width: "40px", height: "40px", fontSize: "20px", 
              display: "flex", justifyContent: "center", alignItems: "center", 
              textAlign: "center", marginTop: "5px"
            }}>
            ⬇️
          </button>
        </div>

      </div>
    </div>
  );
};

export default GamePage;
