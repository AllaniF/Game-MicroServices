import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UpgradeHero = ({ onClose, hero }) => {
  const [step, setStep] = useState(0);
  const [selectedAttribute, setSelectedAttribute] = useState(null);
  const navigate = useNavigate();

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleUpgrade = (attribute) => {
    console.log(`Upgrading ${attribute}`);
    setSelectedAttribute(attribute);
    setStep(2);
  };

  const handleFinish = () => {
    navigate("/heroes");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        {step === 0 && (
          <>
            <h2 className="text-xl font-bold mb-4">Level Completed</h2>
            <button onClick={handleNext} className="mt-4 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition">Next</button>
          </>
        )}

        {step === 1 && (
          <>
            <h2 className="text-xl font-bold mb-4">Choose one of the two attributes</h2>
            <button onClick={() => handleUpgrade("HP")} className="mt-4 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition">HP</button>
            <button onClick={() => handleUpgrade("ATK")} className="mt-4 px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 transition">ATK</button>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-xl font-bold mb-4">Upgrade Applied: {selectedAttribute}</h2>
            <button onClick={handleFinish} className="mt-4 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition">Finish</button>
          </>
        )}
      </div>
    </div>
  );
};

export default UpgradeHero;
