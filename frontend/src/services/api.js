import axios from "axios";

const ENTITY_API_URL = "http://localhost:8002/entity";
const MAP_API_URL = "http://Map-Service:8004/map";

// Instancia de Axios para Entity API
export const entityApi = axios.create({
  baseURL: ENTITY_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Instancia de Axios para Map API
export const mapApi = axios.create({
  baseURL: MAP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
