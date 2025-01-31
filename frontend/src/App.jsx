import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeroManager from "./components/HeroManager";
import Home from "./pages/Home";
import Map from "./components/Map";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/heroes" element={<HeroManager />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </Router>
  );
};

export default App;
