// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import LandingPage from "./screens/LandingPage";
import Calculator from "./screens/Calculator";

const LandingWrapper: React.FC = () => {
  const navigate = useNavigate();
  return <LandingPage onStart={() => navigate("/calculator")} />;
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingWrapper />} />
        <Route path="/calculator" element={<Calculator />} />
      </Routes>
    </Router>
  );
};

export default App;
