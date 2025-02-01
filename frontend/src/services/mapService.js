import { mapApi } from "./api";

// Obtener el mapa desde la API
export const getMap = async () => {
  try {
    const response = await mapApi.get("/map");
    return response.data;
  } catch (error) {
    console.error("Error fetching map:", error);
    throw error;
  }
};
