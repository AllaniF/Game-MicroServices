//const API_URL = "http://localhost/entity/heros"; // Cambia por tu URL base

// Obtener todos los héroes
/*
export const getHeroes = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Error fetching heroes");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Crear un nuevo héroe
export const createHero = async (name) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    if (!response.ok) throw new Error("Error creating hero");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};
*/
// Datos simulados
let mockHeroes = [
  {
    id: 1,
    name: "Ironman",
    type: "Tech",
    level: 50,
    dunjonNb: 10,
    maxHP: 1000,
    gold: 5000.5,
    ATK: 300,
  },
  {
    id: 2,
    name: "Thor",
    type: "God",
    level: 70,
    dunjonNb: 20,
    maxHP: 2000,
    gold: 8000.0,
    ATK: 500,
  },
  {
    id: 3,
    name: "Hulk",
    type: "Mutant",
    level: 60,
    dunjonNb: 15,
    maxHP: 3000,
    gold: 1000.0,
    ATK: 400,
  },
];

// Simular un retardo en las respuestas (opcional)
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Función para obtener héroes
export const getHeroes = async () => {
  await delay(500); // Simula el retardo de una API
  return mockHeroes;
};

// Función para crear un héroe
export const createHero = async (name) => {
  await delay(500); // Simula el retardo de una API

  // Crear un nuevo héroe con valores predeterminados
  const newHero = {
    id: mockHeroes.length + 1,
    name,
    type: "Default",
    level: 1,
    dunjonNb: 0,
    maxHP: 100,
    gold: 0.0,
    ATK: 10,
  };

  // Agregar a los datos simulados
  mockHeroes.push(newHero);
  return newHero;
};

  