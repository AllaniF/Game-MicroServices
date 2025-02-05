import { fightApi } from "./api";

export const calculateFight = async (heroId, currentHP, atk) => {
  try {
    const response = await fightApi.post("/calculate", { heroId, currentHP, atk });
    return response.data;
  } catch (error) {
    console.error("Error calculating fight:", error);
    throw error;
  }
};
