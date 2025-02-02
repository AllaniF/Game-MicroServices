import axios from "axios";

const ENTITY_API_URL = "http://localhost:8002/entity";
const MAP_API_URL = "http://localhost:8004/map";
const GAME_STATE_API_URL = "http://localhost:8001/game-state";


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

export const gameStateApi = axios.create({
  baseURL: GAME_STATE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
