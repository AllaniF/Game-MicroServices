import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getHeroes, createHero } from "../services/entityService";

const HeroManager = () => {
  const [heroes, setHeroes] = useState([]);
  const [newHeroName, setNewHeroName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [selectedHero, setSelectedHero] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  // Load heroes when the component mounts
  useEffect(() => {
    const fetchHeroes = async () => {
      setLoading(true);
      setErrorMessage(null);
      try {
        const data = await getHeroes();
        setHeroes(data);
      } catch (error) {
        setErrorMessage("Error retrieving heroes. Please check the API.");
      } finally {
        setLoading(false);
      }
    };

    fetchHeroes();
  }, []);

  // Handle hero creation
  const handleCreateHero = async () => {
    // Clear previous messages
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!newHeroName.trim()) {
      setErrorMessage("Hero name cannot be empty.");
      return;
    }

    setLoading(true);
    try {
      const newHero = await createHero(newHeroName);
      // Add the new hero to the list
      setHeroes((prevHeroes) => [...prevHeroes, newHero]);
      // Automatically select the new hero
      setSelectedHero(newHero);
      // Reset the form
      setNewHeroName("");
      setIsCreating(false);
      // Show success message
      setSuccessMessage("Hero created successfully.");
    } catch (error) {
      setErrorMessage("Error creating hero. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle hero selection from the dropdown
  const handleSelectHero = (heroId) => {
    const hero = heroes.find((h) => h.id === parseInt(heroId, 10));
    setSelectedHero(hero);
  };

  // Start game with the selected hero
  const handleStartGame = () => {
    if (selectedHero) {
      navigate("/game", { state: { hero: selectedHero } });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Select or Create a Hero</h1>

      {/* Display error or success messages */}
      {errorMessage && <p className="text-red-500 mb-2">{errorMessage}</p>}
      {successMessage && <p className="text-green-500 mb-2">{successMessage}</p>}

      {loading ? (
        <p>Loading heroes...</p>
      ) : (
        <>
          <select
            className="p-2 border rounded mb-4 w-64"
            defaultValue={selectedHero ? selectedHero.id : ""}
            onChange={(e) => handleSelectHero(e.target.value)}
          >
            <option value="" disabled>
              Select a hero
            </option>
            {heroes.length > 0 ? (
              heroes.map((hero) => (
                <option key={hero.id} value={hero.id}>
                  {hero.name}
                </option>
              ))
            ) : (
              <option disabled>No heroes available</option>
            )}
          </select>
        </>
      )}

      {/* Display selected hero details */}
      {selectedHero && (
        <div className="border p-4 rounded bg-white shadow-md w-64 mt-4">
          <h2 className="text-xl font-bold mb-2">Hero Details</h2>
          <p>
            <strong>Name:</strong> {selectedHero.name}
          </p>
          <p>
            <strong>Level:</strong> {selectedHero.level}
          </p>
          <p>
            <strong>Max HP:</strong> {selectedHero.maxHP}
          </p>
          <p>
            <strong>Gold:</strong> {selectedHero.gold}
          </p>
          <p>
            <strong>Attack:</strong> {selectedHero.atk}
          </p>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4 w-full"
            onClick={handleStartGame}
          >
            Start Game
          </button>
        </div>
      )}

      {/* Button to show the form for creating a new hero */}
      {!isCreating && (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
          onClick={() => {
            setIsCreating(true);
            // Clear messages when opening the form
            setErrorMessage(null);
            setSuccessMessage(null);
          }}
        >
          Create Hero
        </button>
      )}

      {/* Form for creating a hero */}
      {isCreating && (
        <div className="flex flex-col items-center mt-4">
          <input
            type="text"
            className="p-2 border rounded mb-2 w-64"
            placeholder="Hero name"
            value={newHeroName}
            onChange={(e) => setNewHeroName(e.target.value)}
          />
          <div className="flex gap-4">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={handleCreateHero}
              disabled={loading}
            >
              Save
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={() => {
                setIsCreating(false);
                setErrorMessage(null);
                setSuccessMessage(null);
              }}
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