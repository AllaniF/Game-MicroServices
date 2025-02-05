import { mapApi } from "./api";

export const getMap = async (heroId) => {
  try {
    const response = await mapApi.get(`/map?heroID=${heroId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching map:", error);
    throw error;
  }
};
