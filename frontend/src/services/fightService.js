import api from "./api";

export const calculateFight = async (heroId, currentHP, atk) => {
  try {
    const response = await api.post("/fight/calculate", { heroId, currentHP, atk });
    return response.data;
  } catch (error) {
    console.error("Error calculating fight:", error);
    throw error;
  }
};
