import React from "react";
import character1 from "../../assets/characters/character1.png";

const TILE_SIZE = 70;

const Character = ({ position }) => {
  return (
    <div
      style={{
        position: "absolute",
        left: `${position.x * TILE_SIZE}px`,
        top: `${position.y * TILE_SIZE}px`,
        width: TILE_SIZE,
        height: TILE_SIZE,
        transition: "0.2s ease-in-out",
      }}
    >
      <img src={character1} alt="Character" style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default Character;