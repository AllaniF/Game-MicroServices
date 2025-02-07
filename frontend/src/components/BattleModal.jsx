import React, { useState, useEffect } from "react";
import { calculateFight } from "../services/fightService";

const BattleModal = ({ onClose, hero }) => {
  const [step, setStep] = useState(0);
  const [battleResult, setBattleResult] = useState(null);

  const handleNext = async () => {
    if (step === 1 && hero) {
      try {
        const fightResponse = await calculateFight(hero.id, hero.currentHP, hero.atk);
        setBattleResult(fightResponse);
      } catch (error) {
        console.error("Error calculating fight:", error);
      }
    }
    setStep((prevStep) => prevStep + 1);
  };

  const handleClose = () => {
    if (battleResult) {
      onClose(battleResult); // Pasar el resultado al GamePage para actualizar currentHP
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        {step === 0 && (
          <>
            <h2 className="text-xl font-bold mb-4">A battle has started!</h2>
            <button onClick={handleNext} className="mt-4 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition">
              Next
            </button>
          </>
        )}

        {step === 1 && hero && (
          <>
            <h2 className="text-xl font-bold mb-4">Battle Details</h2>
            <div className="my-4 border p-4 rounded-md">
              <h3>👦 {hero.name}</h3>
              <p><strong>Level:</strong> {hero.level}</p>
              <p><strong>HP:</strong> {hero.currentHP} / {hero.maxHP}</p>
              <p><strong>ATK:</strong> {hero.atk}</p>
            </div>
            <button onClick={handleNext} className="mt-4 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition">
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
            <button onClick={handleClose} className="mt-4 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition">
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default BattleModal;
