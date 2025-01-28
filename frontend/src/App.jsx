import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeroManager from "./components/HeroManager";
import Home from "./pages/Home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/heroes" element={<HeroManager />} />
      </Routes>
    </Router>
  );
};

export default App;
