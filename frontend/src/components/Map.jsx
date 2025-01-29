import React, { useEffect, useState } from "react";

// Importar las imágenes desde la carpeta assets
import character from "../../assets/maincharacter3.jpg";
import house from "../../assets/house.png";
import tree from "../../assets/tree.png";
import grass from "../../assets/grass.png";
import flowers from "../../assets/flowers.jpg";

// Matriz del mapa (puede ser importada desde un archivo separado)
const mapMatrix = [
  ["S", "E", "B", "E", "F"],
  ["E", "B", "E", "B", "E"],
  ["E", "E", "E", "E", "E"],
  ["B", "E", "B", "E", "B"],
  ["E", "E", "E", "E", "E"],
];

const TILE_SIZE = 100; // Tamaño de cada tile en píxeles

const getRandomTile = (type) => {
  if (type === "E") {
    const options = [grass, flowers, null]; // Puede ser pasto, flores o vacío
    return options[Math.floor(Math.random() * options.length)];
  }
  return null;
};

const MapRenderer = () => {
  const [randomTiles, setRandomTiles] = useState(
    Array.from({ length: mapMatrix.length }, () =>
      Array.from({ length: mapMatrix[0].length }, () => null)
    )
  );

  useEffect(() => {
    const generatedTiles = mapMatrix.map((row) =>
      row.map((tile) => getRandomTile(tile))
    );
    setRandomTiles(generatedTiles);
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${mapMatrix[0].length}, ${TILE_SIZE}px)`,
        gridTemplateRows: `repeat(${mapMatrix.length}, ${TILE_SIZE}px)`,
        backgroundColor: "#2d6a4f", // Verde base
      }}
    >
      {mapMatrix.map((row, rowIndex) =>
        row.map((tile, colIndex) => {
          let imageSrc = null;
          if (tile === "S") imageSrc = character;
          else if (tile === "F") imageSrc = house;
          else if (tile === "B") imageSrc = tree;
          else if (tile === "E" && randomTiles[rowIndex] && randomTiles[rowIndex][colIndex])
            imageSrc = randomTiles[rowIndex][colIndex];

          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              style={{
                width: TILE_SIZE,
                height: TILE_SIZE,
                backgroundColor: `rgb(${50 + Math.random() * 50}, ${100 +
                  Math.random() * 50}, 50)`, // Variaciones de verde
              }}
            >
              {imageSrc && (
                <img
                  src={imageSrc}
                  alt={tile}
                  style={{ width: "100%", height: "100%" }}
                />
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default MapRenderer;
