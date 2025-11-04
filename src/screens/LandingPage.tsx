// src/screens/LandingPage.tsx
import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Paper, Container } from "@mui/material";

const slidingWords = ["Motivate", "Inspire", "Achieve", "Excel", "Succeed"];

const LandingPage: React.FC<{ onStart: () => void }> = ({ onStart }) => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false); // start fade out
            setTimeout(() => {
                setCurrentWordIndex((prev) => (prev + 1) % slidingWords.length);
                setFade(true); // fade in new word
            }, 500); // match transition duration
        }, 2500); // change word every 2.5 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <Container maxWidth="md" sx={{ textAlign: "center", py: 8 }}>
            {/* Hero Section */}
            <Typography
                variant="h2"
                sx={{
                    fontWeight: "bold",
                    mb: 3,
                    minWidth: "150px",
                    display: "inline-block",
                }}
            >
                <span
                    style={{
                        color: "#ffeb3b",
                        transition: "opacity 0.5s ease",
                        opacity: fade ? 1 : 0,
                        display: "inline-block",
                    }}
                >
                    {slidingWords[currentWordIndex]}
                </span>{" "}
                Your GPA Journey
            </Typography>

            <Typography variant="h6" sx={{ mb: 5, color: "#555" }}>
                Take control of your academic performance. Track your GPA and CGPA
                with ease, stay motivated, and reach your academic goals.
            </Typography>

            <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={onStart}
                sx={{ mb: 6 }}
            >
                Start Calculating
            </Button>

            {/* How to Use */}
            <Paper
                elevation={3}
                sx={{ p: 4, mb: 6, borderRadius: 2, backgroundColor: "#f5f5f5" }}
            >
                <Typography variant="h5" sx={{ mb: 2 }}>
                    How to Use the App
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                    1. Select your grading country.
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                    2. Add your courses for each semester with marks and units.
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                    3. Calculate your GPA for each semester.
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                    4. Track your overall CGPA and see your academic performance.
                </Typography>
            </Paper>

            {/* Motivation Section */}
            <Paper
                elevation={3}
                sx={{ p: 4, borderRadius: 2, backgroundColor: "#e0f7fa" }}
            >
                <Typography variant="h5" sx={{ mb: 2 }}>
                    Stay Motivated!
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                    Every calculation brings you closer to understanding your academic
                    strengths and areas to improve.
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                    Keep pushing yourself, track progress, and celebrate small wins.
                </Typography>
                <Typography variant="body1">
                    Your success is a journey. Start today and excel tomorrow!
                </Typography>
            </Paper>
        </Container>
    );
};

export default LandingPage;
