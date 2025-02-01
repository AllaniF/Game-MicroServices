import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleSelectHero = () => {
    navigate("/heroes"); // Go to the hero selection page
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
        onClick={handleSelectHero}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >
        Select Hero
      </button>
    </div>
  );
};

export default Home;
