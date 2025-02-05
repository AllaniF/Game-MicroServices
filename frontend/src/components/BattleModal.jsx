import React, { useState, useEffect } from "react";
import { getEnemies } from "../services/entityService";
import { calculateFight } from "../services/fightService";

const BattleModal = ({ onClose, hero }) => {
  const [step, setStep] = useState(0);
  const [enemy, setEnemy] = useState(null);
  const [battleResult, setBattleResult] = useState(null);

  useEffect(() => {
    const fetchEnemy = async () => {
      if (!hero.id) {
        console.error("No hero ID provided.");
        return;
      }
      try {
        const enemies = await getEnemies(hero.id);
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

  const handleNext = async () => {
    if (step === 1 && hero && enemy) {
      try {
        const fightResponse = await calculateFight(hero.id, hero.maxHP, hero.atk);
        setBattleResult(fightResponse);
      } catch (error) {
        console.error("Error calculating fight:", error);
      }
    }

    setStep((prevStep) => prevStep + 1);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        {step === 0 && (
          <>
            <h2 className="text-xl font-bold mb-4">A battle has started!</h2>
            <button
              onClick={handleNext}
              className="mt-4 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition"
            >
              Next
            </button>
          </>
        )}

        {step === 1 && hero && enemy && (
          <>
            <h2 className="text-xl font-bold mb-4">Battle Details</h2>
            <div className="flex justify-between items-center my-4 border p-4 rounded-md">
              <div className="text-left border-2 border-blue-500 p-2 rounded bg-blue-100 w-2/5">
                <h3>👦 {hero.name}</h3>
                <p><strong>Level:</strong> {hero.level}</p>
                <p><strong>HP:</strong> {hero.maxHP}</p>
                <p><strong>ATK:</strong> {hero.ATK}</p>
                <p><strong>Gold:</strong> {hero.gold}</p>
              </div>

              <div className="text-xl font-bold">⚔️ VS ⚔️</div>

              <div className="text-left border-2 border-red-500 p-2 rounded bg-red-100 w-2/5">
                <h3>👹 {enemy.name}</h3>
                <p><strong>Level:</strong> {enemy.level}</p>
                <p><strong>HP:</strong> {enemy.maxHP}</p>
                <p><strong>ATK:</strong> {enemy.ATK}</p>
                <p><strong>Gold:</strong> {enemy.gold}</p>
              </div>
            </div>
            <button
              onClick={handleNext}
              className="mt-4 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition"
            >
              Fight!
            </button>
          </>
        )}

        {step === 2 && battleResult && (
          <>
            <h2 className="text-xl font-bold mb-4">Battle Result</h2>
            <p><strong>Result:</strong> {battleResult.result === "win" ? "🎉 You won!" : "💀 You lost!"}</p>
            <p><strong>Your Remaining HP:</strong> {battleResult.heroRemainingHP}</p>
            <p><strong>Enemy Remaining HP:</strong> {battleResult.enemyRemainingHP}</p>
            <p className="mt-2 italic">"{battleResult.battleLog}"</p>

            <button
              onClick={onClose}
              className="mt-4 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition"
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default BattleModal;
