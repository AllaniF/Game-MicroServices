import axios from "axios";

const MAP_API_URL = "http://Map-Service:8004";

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
