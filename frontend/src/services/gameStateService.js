import { gameStateApi } from "./api";

export const saveSelectedHero = async (heroData) => {
  try {
    const response = await gameStateApi.post("/selected-hero", {heroData});
    return response.data;
  } catch (error) {
    console.error("Error saving selected hero:", error);
    throw error;
  }
};

export const saveMap = async (mapData) => {
  try {
    const response = await gameStateApi.post("/map", { mapData });
    return response.data;
  } catch (error) {
    console.error("Error saving map:", error);
    throw error;
  }
};

export const moveHero = async (direction) => {
  try {
    const response = await gameStateApi.post("/next-position", { direction });
    return response.data;
  } catch (error) {
    console.error("Error moving hero:", error);
    throw error;
  }
};