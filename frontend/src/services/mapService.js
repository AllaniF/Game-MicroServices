import { mapApi } from "./api";

export const getMap = async () => {
  try {
    const response = await mapApi.get();
    return response.data;
  } catch (error) {
    console.error("Error fetching map:", error);
    throw error;
  }
};
