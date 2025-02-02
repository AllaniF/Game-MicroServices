import { gameStateApi } from "./api";

export const storeSelectedHero = async (heroData) => {
  try {
    const response = await api.post("http://localhost:8001/game-state/selected-hero", heroData);
    return response.data;
  } catch (error) {
    console.error("Error storing selected hero:", error);
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


export const calculateNextPosition = async (direction) => {
  try {
    const response = await api.post("http://localhost:8001/game-state/next-position", { direction });
    return response.data;
  } catch (error) {
    console.error("Error calculating next position:", error);
    throw error;
  }
};

export const storeCombatResults = async (remainingHp) => {
  try {
    const response = await api.post("http://localhost:8001/game-state/combat-results", { remainingHp });
    return response.data;
  } catch (error) {
    console.error("Error storing combat results:", error);
    throw error;
  }
};

export const upgradeHero = async (upgradeType) => {
  try {
    const response = await api.post("http://localhost:8001/game-state/upgrade-hero", { upgrade: upgradeType });
    return response.data;
  } catch (error) {
    console.error("Error upgrading hero:", error);
    throw error;
  }
};
