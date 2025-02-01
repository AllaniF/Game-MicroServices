import React, { useState, useEffect } from "react";
import MapRenderer from "../components/MapRenderer";
import Character from "../components/Character";
import { useLocation } from "react-router-dom";
import { getMap } from "../services/mapService";

const GamePage = () => {
  const location = useLocation();
  const selectedHero = location.state?.hero || null;

  const [mapMatrix, setMapMatrix] = useState([]);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fetchMap = async () => {
      try {
        const data = await getMap();
        if (data && data.matrix && data.matrix.matrix) {
          setMapMatrix(data.matrix.matrix);
        }
      } catch (error) {
        console.error("Error loading map:", error);
      }
    };

    fetchMap();
  }, []);

  const MAP_WIDTH = mapMatrix.length > 0 ? mapMatrix[0].length : 0;
  const MAP_HEIGHT = mapMatrix.length;

  const handleMove = (direction) => {
    setPosition((prev) => {
      let newX = prev.x;
      let newY = prev.y;

      switch (direction) {
        case "up":
          if (newY > 0) newY--;
          break;
        case "down":
          if (newY < MAP_HEIGHT - 1) newY++;
          break;
        case "left":
          if (newX > 0) newX--;
          break;
        case "right":
          if (newX < MAP_WIDTH - 1) newX++;
          break;
        default:
          break;
      }

      return { x: newX, y: newY };
    });
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ flex: "3", position: "relative", borderRight: "2px solid black" }}>
        <MapRenderer mapMatrix={mapMatrix} />
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

        <p><strong>Position:</strong> ({position.x}, {position.y})</p>

        {/* Controles de movimiento */}
        <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <button 
            onClick={() => handleMove("up")} 
            style={{ width: "40px", height: "40px", fontSize: "20px", marginBottom: "5px" }}>
            ⬆️
          </button>
          
          <div style={{ display: "flex", gap: "40px" }}>
            <button onClick={() => handleMove("left")} style={{ width: "40px", height: "40px", fontSize: "20px" }}>
              ⬅️
            </button>
            
            <button onClick={() => handleMove("right")} style={{ width: "40px", height: "40px", fontSize: "20px" }}>
              ➡️
            </button>
          </div>
          
          <button 
            onClick={() => handleMove("down")} 
            style={{ width: "40px", height: "40px", fontSize: "20px", marginTop: "5px" }}>
            ⬇️
          </button>
        </div>

      </div>
    </div>
  );
};

export default GamePage;
