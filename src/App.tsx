import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./screens/LandingPage";
import Calculator from "./screens/Calculator";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/calculator" element={<Calculator />} />
            </Routes>
        </Router>
    );
};

export default App;
