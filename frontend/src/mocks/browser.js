import { setupWorker, rest } from "msw";

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
];

// Configuración del servidor de simulación
export const worker = setupWorker(
  // Simular el endpoint GET /heroes
  rest.get("https://your-api-endpoint/heroes", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockHeroes));
  }),

  // Simular el endpoint POST /heroes
  rest.post("https://your-api-endpoint/heroes", async (req, res, ctx) => {
    const { name } = await req.json();
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
    mockHeroes.push(newHero);
    return res(ctx.status(201), ctx.json(newHero));
  })
);
