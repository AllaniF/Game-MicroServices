import React from "react";
import MapRenderer from "../components/Map";
import { useLocation } from "react-router-dom";

const GamePage = () => {
  const location = useLocation();
  const selectedHero = location.state?.hero || null;

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Contenedor del mapa (60% de la pantalla) */}
      <div style={{ flex: "3", display: "flex", justifyContent: "center", alignItems: "center", borderRight: "2px solid black" }}>
        <div style={{ width: "90%", height: "90%", border: "2px solid black" }}>
          <MapRenderer />
        </div>
      </div>
      
      {/* Contenedor de información del héroe (40% de la pantalla) */}
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
      </div>
    </div>
  );
};

export default GamePage;