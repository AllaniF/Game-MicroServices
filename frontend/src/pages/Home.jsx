import React from "react";
import { useNavigate } from "react-router-dom";
import { newGame } from "../services/gameStateService";

const Home = () => {
  const navigate = useNavigate();

  const handleStartGame = async () => {
    try {
      await newGame();
      navigate("/heroes");
    } catch (error) {
      console.error("Error starting new game:", error);
      alert("Failed to start a new game. Please try again.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <h1>Welcome to the Adventure</h1>
      <p>Select a hero to begin your journey.</p>
      <button
        onClick={handleStartGame}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >
        Start Game
      </button>
    </div>
  );
};

export default Home;
