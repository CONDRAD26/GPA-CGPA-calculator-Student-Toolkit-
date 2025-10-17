import React from "react";
import { Container, Typography, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
                <Typography variant="h4" gutterBottom color="primary">
                    GPA & CGPA Calculator
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Grading system:
                    <br /> 80+ → 5.0
                    <br /> 75–79 → 4.5
                    <br /> 70–74 → 4.0
                    <br /> 65–69 → 3.5
                    <br /> 60–64 → 3.0
                    <br /> 50–59 → 2.0
                    <br /> Below 50 → 0.0
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3 }}
                    onClick={() => navigate("/calculator")}
                >
                    Go to Calculator
                </Button>
            </Paper>
        </Container>
    );
};

export default LandingPage;
