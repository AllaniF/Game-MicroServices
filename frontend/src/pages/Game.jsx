import React, { useState, useEffect } from "react";
import MapRenderer from "../components/MapRenderer";
import Character from "../components/Character";
import BattleModal from "../components/BattleModal";
import UpgradeHero from "../components/UpgradeHero";
import { useLocation } from "react-router-dom";
import { getMap } from "../services/mapService";
import { moveHero, saveMap, saveSelectedHero } from "../services/gameStateService";

const GamePage = () => {
  const location = useLocation();
  const selectedHero = location.state?.hero || null;

  if (!selectedHero || !selectedHero.id) {
    console.error("No hero received in GamePage.");
  }

  const [mapMatrix, setMapMatrix] = useState([]);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [currentHP, setCurrentHP] = useState(selectedHero?.maxHP || 0);
  const [isBattleActive, setIsBattleActive] = useState(false);
  const [isUpgradeActive, setIsUpgradeActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isMapReady, setIsMapReady] = useState(false);

  useEffect(() => {
    const initializeGame = async () => {
      try {
        if (!selectedHero || !selectedHero.id) {
          console.error("No hero selected or missing hero ID.");
          return;
        }

        await saveSelectedHero(selectedHero);
        setCurrentHP(selectedHero.maxHP); // Asegurar que currentHP inicie con maxHP

        const data = await getMap(selectedHero.id);

        if (data && data.matrix && data.matrix.matrix) {
          setMapMatrix(data.matrix.matrix);
          await saveMap({ id: 0, matrix: data.matrix.matrix });
          setIsMapReady(true);
        }
      } catch (error) {
        console.error("Error initializing game:", error);
        setErrorMessage("Error initializing game. Please try again.");
      }
    };

    if (selectedHero) {
      initializeGame();
    }
  }, [selectedHero]);

  const handleMove = async (direction) => {
    if (!isMapReady) {
      return;
    }

    try {
      const response = await moveHero(direction);

      if (response.nextPosition) {
        setPosition(response.nextPosition);
      }
      if (response.currentHP !== undefined && response.currentHP !== null) {
        setCurrentHP(response.currentHP > 0 ? response.currentHP : currentHP);
      }
      if (response.isFighting) {
        setIsBattleActive(true);
      }
      if (response.isFinished) {
        alert("Level Completed!");
      }
    } catch (error) {
      setErrorMessage("Error moving hero. Please try again.");
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ flex: "3", position: "relative", borderRight: "2px solid black" }}>
        <MapRenderer mapMatrix={mapMatrix} heroId={selectedHero?.id} />
        <Character position={position} />
      </div>

      <div style={{ width: "400px", padding: "20px", flexShrink: 0 }}>
        {!isBattleActive && !isUpgradeActive && (
          <div style={{ textAlign: "center" }}>
            <h1>Hero Info</h1>
            {selectedHero && (
              <div style={{ textAlign: "left", border: "1px solid black", padding: "10px", width: "80%", margin: "0 auto" }}>
                <p><strong>Name:</strong> {selectedHero.name}</p>
                <p><strong>Level:</strong> {selectedHero.level}</p>
                <p><strong>Max HP:</strong> {selectedHero.maxHP}</p>
                <p><strong>Current HP:</strong> {currentHP}</p>
                <p><strong>Gold:</strong> {selectedHero.gold}</p>
                <p><strong>ATK:</strong> {selectedHero.atk}</p>
              </div>
            )}
            <p><strong>Position:</strong> ({position.x}, {position.y})</p>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            {!isMapReady && <p>El mapa aún no está listo...</p>}

            <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <button onClick={() => handleMove("up")} disabled={!isMapReady}style={{ width: "40px", height: "40px", fontSize: "20px", marginBottom: "5px", opacity: isMapReady ? 1 : 0.5 }}>⬆️</button>
              <div style={{ display: "flex", gap: "40px" }}>
                <button onClick={() => handleMove("left")} disabled={!isMapReady} style={{ width: "40px", height: "40px", fontSize: "20px", opacity: isMapReady ? 1 : 0.5 }}>⬅️</button>
                <button onClick={() => handleMove("right")} disabled={!isMapReady} style={{ width: "40px", height: "40px", fontSize: "20px", opacity: isMapReady ? 1 : 0.5 }}>➡️</button>
              </div>
              <button onClick={() => handleMove("down")} disabled={!isMapReady} style={{ width: "40px", height: "40px", fontSize: "20px", marginTop: "5px", opacity: isMapReady ? 1 : 0.5 }}>⬇️</button>
            </div>

            <button onClick={() => setIsBattleActive(true)} style={{ marginTop: "20px" }}>⚔️ Fight</button>
            <button onClick={() => setIsUpgradeActive(true)} style={{ marginTop: "20px" }}>🔼 Upgrade Hero</button>
          </div>
        )}

        {isBattleActive && (
          <BattleModal hero={{ ...selectedHero, currentHP }} onClose={() => setIsBattleActive(false)} />
        )}

        {isUpgradeActive && (
          <UpgradeHero hero={selectedHero} onClose={() => setIsUpgradeActive(false)} />
        )}
      </div>
    </div>
  );
};

export default GamePage;
