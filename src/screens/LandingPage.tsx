// src/screens/LandingPage.tsx
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";

const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                minHeight: "100vh",
                background: "linear-gradient(to bottom, #e8f5e9, #ffffff)", // soft green to white
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                p: { xs: 2, md: 4 },
                textAlign: "center",
            }}
        >
            {/* Main Heading */}
            <Typography
                variant="h3"
                sx={{ fontWeight: "bold", color: "#2e7d32", mb: 2 }}
            >
                Welcome to GPA & CGPA Calculator
            </Typography>

            {/* Typewriter Text */}
            <Typography
                variant="h5"
                sx={{ color: "#1b5e20", mb: 4, minHeight: "40px" }}
            >
                <Typewriter
                    words={[
                        "Track your academic performance effortlessly.",
                        "Visualize your GPA trends.",
                        "Plan your semesters smartly.",
                        "Stay motivated and achieve your best!"
                    ]}
                    loop={0}
                    cursor
                    cursorStyle="|"
                    typeSpeed={70}
                    deleteSpeed={40}
                    delaySpeed={1500}
                />
            </Typography>

            {/* How to Use / Instructions */}
            <Box
                sx={{
                    maxWidth: 500,
                    mb: 4,
                    p: 3,
                    borderRadius: 2,
                    backgroundColor: "#f1f8e9",
                    boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",
                }}
            >
                <Typography variant="body1" sx={{ mb: 1 }}>
                    1. Select your grading system (Uganda, USA, India).
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                    2. Add your academic years and semesters.
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                    3. Enter your courses, marks, and units.
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                    4. Click “Calculate GPA” to see your semester GPA.
                </Typography>
                <Typography variant="body1">
                    5. View your summary to see your overall CGPA and class.
                </Typography>
            </Box>

            {/* Start Button */}
            <Button
                variant="contained"
                color="success"
                size="large"
                sx={{ px: 5, py: 1.5, fontSize: "1.2rem" }}
                onClick={() => navigate("/calculator")}
            >
                Start Using App
            </Button>
        </Box>
    );
};

export default LandingPage;
