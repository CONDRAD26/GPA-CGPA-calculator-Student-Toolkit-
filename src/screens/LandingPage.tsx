// src/screens/LandingPage.tsx
import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const slidingWords = ["Achieve", "Calculate", "Excel", "Succeed", "Track"];

const LandingPage: React.FC = () => {
    const navigate = useNavigate();
    const [currentWordIndex, setCurrentWordIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentWordIndex((prev) => (prev + 1) % slidingWords.length);
        }, 2000); // change word every 2 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                background: "linear-gradient(to right, #6a11cb, #2575fc)",
                color: "white",
                px: 2,
                textAlign: "center",
            }}
        >
            {/* Hero Section */}
            <Typography variant="h2" sx={{ fontWeight: "bold", mb: 3 }}>
                <span style={{ color: "#ffeb3b" }}>{slidingWords[currentWordIndex]}</span> Your GPA Journey
            </Typography>
            <Typography variant="h5" sx={{ mb: 4 }}>
                Track, calculate, and achieve your academic goals effortlessly!
            </Typography>

            {/* Call-to-Action */}
            <Button
                variant="contained"
                color="secondary"
                size="large"
                sx={{ px: 5, py: 1.5, mb: 6 }}
                onClick={() => navigate("/calculator")}
            >
                Start Calculating
            </Button>

            {/* How to Use Section */}
            <Paper
                elevation={5}
                sx={{
                    p: 4,
                    maxWidth: 600,
                    borderRadius: 3,
                    backgroundColor: "rgba(255,255,255,0.9)",
                    color: "black",
                }}
            >
                <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                    How to Use This App:
                </Typography>
                <Typography sx={{ mb: 1 }}>
                    1. Select your country to use the correct grading scale.
                </Typography>
                <Typography sx={{ mb: 1 }}>
                    2. Enter your course codes, marks, and units for each semester.
                </Typography>
                <Typography sx={{ mb: 1 }}>
                    3. Click "Calculate GPA" to see your semester GPA.
                </Typography>
                <Typography sx={{ mb: 1 }}>
                    4. Track your CGPA across multiple years effortlessly.
                </Typography>
                <Typography sx={{ mt: 2, fontWeight: "bold", color: "#2575fc" }}>
                    Stay motivated and aim higher each semester!
                </Typography>
            </Paper>
        </Box>
    );
};

export default LandingPage;
