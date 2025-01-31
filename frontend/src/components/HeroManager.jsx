import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate para redirigir
import { getHeroes, createHero } from "../services/heroService";

const HeroManager = () => {
  const [heroes, setHeroes] = useState([]); // Lista de héroes
  const [newHeroName, setNewHeroName] = useState(""); // Nombre del nuevo héroe
  const [isCreating, setIsCreating] = useState(false); // Estado de creación
  const [selectedHero, setSelectedHero] = useState(null); // Héroe seleccionado
  const navigate = useNavigate(); // Hook para redirigir a otra página

  // Cargar héroes al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      const data = await getHeroes();
      setHeroes(data);
    };
    fetchData();
  }, []);

  // Manejar la creación de héroes
  const handleCreateHero = async () => {
    if (!newHeroName) return;

    const newHero = await createHero(newHeroName);
    setHeroes((prev) => [...prev, newHero]); // Agregar héroe a la lista
    setNewHeroName(""); // Limpiar el campo de entrada
    setIsCreating(false); // Salir del modo de creación
  };

  // Manejar la selección de un héroe
  const handleSelectHero = (heroId) => {
    const hero = heroes.find((h) => h.id === parseInt(heroId));
    setSelectedHero(hero);
  };

  // Cancelar la creación
  const handleCancelCreate = () => {
    setNewHeroName(""); // Limpiar el nombre ingresado
    setIsCreating(false); // Salir del modo de creación
  };

  // Navegar a Home
  const handleGoHome = () => {
    navigate("/"); // Redirige a la página de inicio
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Héroes</h1>

      {/* Lista desplegable */}
      <select
        className="p-2 border rounded mb-4 w-64"
        defaultValue=""
        onChange={(e) => handleSelectHero(e.target.value)}
      >
        <option value="" disabled>
          Selecciona un héroe
        </option>
        {heroes.map((hero) => (
          <option key={hero.id} value={hero.id}>
            {hero.name}
          </option>
        ))}
      </select>

      {/* Detalles del héroe seleccionado */}
      {selectedHero && (
        <div className="border p-4 rounded bg-white shadow-md w-64 mt-4">
          <h2 className="text-xl font-bold mb-2">Detalles del Héroe</h2>
          <p>
            <strong>Nombre:</strong> {selectedHero.name}
          </p>
          <p>
            <strong>Tipo:</strong> {selectedHero.type}
          </p>
          <p>
            <strong>Nivel:</strong> {selectedHero.level}
          </p>
          <p>
            <strong>HP Máximo:</strong> {selectedHero.maxHP}
          </p>
          <p>
            <strong>Oro:</strong> {selectedHero.gold}
          </p>
          <p>
            <strong>ATAQUE:</strong> {selectedHero.ATK}
          </p>
          {/* Botón Select */}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4 w-full"
            onClick={handleGoHome}
          >
            Select
          </button>
        </div>
      )}

      {/* Botón Create */}
      {!isCreating && (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
          onClick={() => setIsCreating(true)}
        >
          Create new Hero
        </button>
      )}

      {/* Campo para crear héroe */}
      {isCreating && (
        <div className="flex flex-col items-center mt-4">
          <input
            type="text"
            className="p-2 border rounded mb-2 w-64"
            placeholder="Nombre del héroe"
            value={newHeroName}
            onChange={(e) => setNewHeroName(e.target.value)}
          />
          <div className="flex gap-4">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={handleCreateHero}
            >
              Save
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={handleCancelCreate}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroManager;
