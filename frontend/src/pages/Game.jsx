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

  const [mapMatrix, setMapMatrix] = useState([]);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isBattleActive, setIsBattleActive] = useState(false);
  const [isUpgradeActive, setIsUpgradeActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isMapReady, setIsMapReady] = useState(false);

  useEffect(() => {
    const initializeGame = async () => {
      try {
        if (!selectedHero) {
          console.error("No hero selected.");
          return;
        }

        // 1️⃣ Guardar el héroe en la API
        console.log("Enviando datos del héroe...");
        await saveSelectedHero(selectedHero);
        console.log("Héroe guardado exitosamente.");

        // 2️⃣ Obtener el mapa
        console.log("Obteniendo el mapa...");
        const data = await getMap();

        if (data && data.matrix && data.matrix.matrix) {
          setMapMatrix(data.matrix.matrix);

          // 3️⃣ Guardar el mapa en la API
          console.log("Enviando mapa a la API...");
          await saveMap({ id: 0, matrix: data.matrix.matrix });
          console.log("Mapa guardado con éxito.");

          // 4️⃣ Ahora el mapa está listo
          setIsMapReady(true);
          console.log("Mapa listo, se puede mover al personaje.");
        }
      } catch (error) {
        console.error("Error initializing game:", error);
        setErrorMessage("Error initializing game. Please try again.");
      }
    };

    initializeGame();
  }, []);

  const handleMove = async (direction) => {
    if (!isMapReady) {
      setErrorMessage("The map is not ready yet. Please wait...");
      return;
    }

    try {
      console.log(`Moviendo en dirección: ${direction}`);
      const response = await moveHero(direction);

      if (response.nextPosition) {
        setPosition(response.nextPosition);
        console.log("Nueva posición del personaje:", response.nextPosition);
      }

      if (response.isFighting) {
        console.log("¡Batalla iniciada!");
        setIsBattleActive(true);
      }

      if (response.isFinished) {
        alert("¡Has alcanzado el objetivo!");
      }
    } catch (error) {
      console.error("Error al mover el personaje:", error);
      setErrorMessage("Error moving hero. Please try again.");
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ flex: "3", position: "relative", borderRight: "2px solid black" }}>
        <MapRenderer mapMatrix={mapMatrix} />
        <Character position={position} />
      </div>

      <div style={{ width: "400px", padding: "20px", flexShrink: 0 }}>
        {!isBattleActive && !isUpgradeActive && (
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
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

            {errorMessage && <p className="text-red-500">{errorMessage}</p>}

            {!isMapReady && <p>El mapa aún no está listo...</p>}

            <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <button onClick={() => handleMove("up")} disabled={!isMapReady} style={{ width: "40px", height: "40px", fontSize: "20px", marginBottom: "5px", opacity: isMapReady ? 1 : 0.5 }}>⬆️</button>
              <div style={{ display: "flex", gap: "40px" }}>
                <button onClick={() => handleMove("left")} disabled={!isMapReady} style={{ width: "40px", height: "40px", fontSize: "20px", opacity: isMapReady ? 1 : 0.5 }}>⬅️</button>
                <button onClick={() => handleMove("right")} disabled={!isMapReady} style={{ width: "40px", height: "40px", fontSize: "20px", opacity: isMapReady ? 1 : 0.5 }}>➡️</button>
              </div>
              <button onClick={() => handleMove("down")} disabled={!isMapReady} style={{ width: "40px", height: "40px", fontSize: "20px", marginTop: "5px", opacity: isMapReady ? 1 : 0.5 }}>⬇️</button>
            </div>

            <button onClick={() => setIsBattleActive(true)} style={{ marginTop: "20px", padding: "10px 20px", fontSize: "18px", backgroundColor: "red", color: "white", border: "none", cursor: "pointer", borderRadius: "5px" }}>⚔️ Fight</button>
            <button onClick={() => setIsUpgradeActive(true)} style={{ marginTop: "20px", padding: "10px 20px", fontSize: "18px", backgroundColor: "green", color: "white", border: "none", cursor: "pointer", borderRadius: "5px" }}>🔼 Upgrade Hero</button>

            {/* Botón de prueba para reenviar el mapa */}
            <button onClick={() => saveMap({ id: 0, matrix: mapMatrix })} style={{ marginTop: "20px", padding: "10px", backgroundColor: "blue", color: "white", borderRadius: "5px" }}>
              🔄 Reenviar Mapa
            </button>
          </div>
        )}

        {isBattleActive && (
          <BattleModal hero={selectedHero} onClose={() => setIsBattleActive(false)} />
        )}

        {isUpgradeActive && (
          <UpgradeHero hero={selectedHero} onClose={() => setIsUpgradeActive(false)} />
        )}
      </div>
    </div>
  );
};

export default GamePage;
