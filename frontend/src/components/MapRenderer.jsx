import React, { useEffect, useState, useMemo } from "react";
import { getMap } from "../services/mapService";
import house from "../../assets/house.png";
import tree1 from "../../assets/trees/tree1.png";
import tree2 from "../../assets/trees/tree2.png";
import tree3 from "../../assets/trees/tree3.png";
import grass1 from "../../assets/grass/grass1.png";
import grass2 from "../../assets/grass/grass2.png";
import grass3 from "../../assets/grass/grass3.png";
import flower1 from "../../assets/flowers/flower1.png";
import flower2 from "../../assets/flowers/flower2.png";

const trees = [tree1, tree2, tree3];
const grassTiles = [grass1, grass2, grass3];
const flowersTiles = [flower1, flower2];

const TILE_SIZE = 70;

const getRandomTile = (type) => {
  if (type === "E") {
    const options = [...grassTiles, ...flowersTiles, null];
    return options[Math.floor(Math.random() * options.length)];
  }
  return null;
};

const MapRenderer = ({ mapMatrix, heroId }) => {
  const [localMapMatrix, setLocalMapMatrix] = useState([]);

  useEffect(() => {
    const fetchMap = async () => {
      try {
        if (!heroId) {
          console.error("No hero ID provided.");
          return;
        }
        const data = await getMap(heroId); // Usamos heroId al llamar getMap
        if (data && data.matrix && data.matrix.matrix) {
          setLocalMapMatrix(data.matrix.matrix);
        }
      } catch (error) {
        console.error("Error loading map:", error);
      }
    };

    fetchMap();
  }, [heroId]); // Se ejecuta cuando heroId cambia

  const renderedMap = useMemo(() => {
    return localMapMatrix.map((row, rowIndex) =>
      row.map((tile, colIndex) => {
        let imageSrc = null;
        let imageSize = "100%";
        let backgroundColor = `rgb(${50 + Math.random() * 50}, ${100 + Math.random() * 50}, 50)`;

        if (tile === "F") {
          imageSrc = house;
        } else if (tile === "B") {
          imageSrc = trees[Math.floor(Math.random() * trees.length)];
        } else if (tile === "E") {
          const randomTile = getRandomTile(tile);
          if (randomTile) {
            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                style={{
                  width: TILE_SIZE,
                  height: TILE_SIZE,
                  display: "grid",
                  gridTemplateColumns: "50% 50%",
                  gridTemplateRows: "50% 50%",
                  backgroundColor: backgroundColor,
                }}
              >
                {[0, 1, 2, 3].map((i) => {
                  const quadrantImage =
                    [...grassTiles, ...flowersTiles, null][
                      Math.floor(Math.random() * (grassTiles.length + flowersTiles.length + 1))
                    ];
                  return quadrantImage ? (
                    <img key={i} src={quadrantImage} alt="grass/flower" style={{ width: "50%", height: "50%" }} />
                  ) : (
                    <div key={i}></div>
                  );
                })}
              </div>
            );
          }
        }

        return (
          <div
            key={`${rowIndex}-${colIndex}`}
            style={{
              width: TILE_SIZE,
              height: TILE_SIZE,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: backgroundColor,
            }}
          >
            {imageSrc && <img src={imageSrc} alt={tile} style={{ width: imageSize, height: imageSize }} />}
          </div>
        );
      })
    );
  }, [localMapMatrix]);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${localMapMatrix.length > 0 ? localMapMatrix[0].length : 0}, ${TILE_SIZE}px)`,
        gridTemplateRows: `repeat(${localMapMatrix.length}, ${TILE_SIZE}px)`,
        backgroundColor: "#2d6a4f",
      }}
    >
      {renderedMap}
    </div>
  );
};

export default MapRenderer;
