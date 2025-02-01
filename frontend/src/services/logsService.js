import api from "./api";

export const saveLog = async (logId, message, timestamp) => {
  try {
    const response = await api.post("http://localhost:8000/logs", { logId, message, timestamp });
    return response.data;
  } catch (error) {
    console.error("Error saving log:", error);
    throw error;
  }
};
