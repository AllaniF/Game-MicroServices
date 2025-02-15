import axios from "axios";

const ENTITY_API_URL = "http://localhost:8002/entity";
const MAP_API_URL = "http://localhost:8004";
const GAME_STATE_API_URL = "http://localhost:8001/game-state";
const FIGHT_API_URL = "http://localhost:8003/fight";

export const entityApi = axios.create({
  baseURL: ENTITY_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

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

export const fightApi = axios.create({
  baseURL: FIGHT_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});