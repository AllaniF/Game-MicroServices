import React, { useState, useEffect } from "react";
import { getEnemies } from "../services/entityService";

const BattleModal = ({ onClose, hero }) => {
  const [step, setStep] = useState(0);
  const [enemy, setEnemy] = useState(null);

  useEffect(() => {
    const fetchEnemy = async () => {
      try {
        const enemies = await getEnemies();
        if (enemies.length > 0) {
          const randomEnemy = enemies[Math.floor(Math.random() * enemies.length)];
          setEnemy(randomEnemy);
        }
      } catch (error) {
        console.error("Error fetching enemy:", error);
      }
    };

    fetchEnemy();
  }, []);

  const handleNext = () => {
    if (step === 0) {
      setStep(1); // Pasamos al mensaje de victoria
    } else {
      onClose(); // Cerramos el modal
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-xl font-bold mb-4">
          {step === 0 ? "¡Se ha iniciado una batalla!" : "¡El personaje ha ganado la batalla!"}
        </h2>

        <div className="flex justify-between items-center my-4 border p-4 rounded-md">
          {/* Información del héroe */}
          {hero ? (
            <div className="text-left border-2 border-blue-500 p-2 rounded bg-blue-100 w-2/5">
              <h3>👦 {hero.name}</h3>
              <p><strong>Nivel:</strong> {hero.level}</p>
              <p><strong>HP:</strong> {hero.maxHP}</p>
              <p><strong>ATK:</strong> {hero.atk}</p>
              <p><strong>Oro:</strong> {hero.gold}</p>
            </div>
          ) : (
            <p>Cargando héroe...</p>
          )}

          {/* VS */}
          <div className="text-xl font-bold">⚔️ VS ⚔️</div>

          {/* Información del enemigo */}
          {enemy ? (
            <div className="text-left border-2 border-red-500 p-2 rounded bg-red-100 w-2/5">
              <h3>👹 {enemy.name}</h3>
              <p><strong>Nivel:</strong> {enemy.level}</p>
              <p><strong>HP:</strong> {enemy.maxHP}</p>
              <p><strong>ATK:</strong> {enemy.atk}</p>
              <p><strong>Oro:</strong> {enemy.gold}</p>
            </div>
          ) : (
            <p>Cargando enemigo...</p>
          )}
        </div>

        <button
          onClick={handleNext}
          className="mt-4 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition"
        >
          {step === 0 ? "Siguiente" : "Cerrar"}
        </button>
      </div>
    </div>
  );
};

export default BattleModal;
