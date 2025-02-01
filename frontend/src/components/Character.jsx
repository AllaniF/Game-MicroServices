import React from "react";
import character1 from "../../assets/characters/character1.png";

const TILE_SIZE = 70;

const Character = ({ position }) => {
  return (
    <img
      src={character1}
      alt="character"
      style={{
        position: "absolute",
        top: position.y * TILE_SIZE,
        left: position.x * TILE_SIZE,
        width: "50px",  // 🔥 Personaje fijo en 60x60
        height: "50px",
      }}
    />
  );
};

export default Character;
