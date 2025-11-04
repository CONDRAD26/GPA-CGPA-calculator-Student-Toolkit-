// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./screens/LandingPage";
import Calculator from "./screens/Calculator";
import Summary from "./screens/Summary";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/calculator" element={<Calculator />} />
        {/* Optional: You can have a route for summary */}
        <Route path="/summary" element={<Summary academicYears={[]} overallCGPA={null} />} />
      </Routes>
    </Router>
  );
};

export default App;
