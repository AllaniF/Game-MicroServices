import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import HeroSelection from "./pages/HeroSelection";
import GamePage from "./pages/Game";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/heroes" element={<HeroSelection />} />
        <Route path="/game" element={<GamePage />} />
      </Routes>
    </Router>
  );
};

export default App;
