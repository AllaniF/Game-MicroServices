import { entityApi } from "./api";

export const getHeroes = async () => {
  try {
    const response = await entityApi.get("/heroes");
    console.log("Heroes:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching heroes:", error);
    throw error;
  }
};

export const createHero = async (name) => {
  try {
    const response = await entityApi.post("/heroes", { name });
    return response.data;
  } catch (error) {
    console.error("Error creating hero:", error);
    throw error;
  }
};

export const getEnemies = async () => {
  try {
    const response = await entityApi.get("/enemy");
    return response.data;
  } catch (error) {
    console.error("Error fetching enemies:", error);
    throw error;
  }
};