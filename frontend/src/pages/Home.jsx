import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Bienvenido a la App de Héroes</h1>
      <Link
        to="/heroes"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Gestionar Héroes
      </Link>
      <Link
        to="/map"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Go to map
      </Link>
    </div>
  );
};

export default Home;
