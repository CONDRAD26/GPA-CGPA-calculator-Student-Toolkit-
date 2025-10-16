import React from "react";
import { Container, Typography, Paper, List, ListItem, ListItemText, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Container maxWidth="md" sx={{ mt: 5 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3, background: "#f5f9ff" }}>
                <Typography variant="h3" gutterBottom color="primary">
                    GPA & CGPA Calculator
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Grading System (Uganda Public Universities)
                </Typography>
                <List>
                    <ListItem><ListItemText primary="A: 80 – 100 → 5.0" /></ListItem>
                    <ListItem><ListItemText primary="B+: 75 – 79 → 4.5" /></ListItem>
                    <ListItem><ListItemText primary="B: 70 – 74 → 4.0" /></ListItem>
                    <ListItem><ListItemText primary="C+: 65 – 69 → 3.5" /></ListItem>
                    <ListItem><ListItemText primary="C: 60 – 64 → 3.0" /></ListItem>
                    <ListItem><ListItemText primary="D: 50 – 59 → 2.0" /></ListItem>
                    <ListItem><ListItemText primary="F: 0 – 49 → 0.0" /></ListItem>
                </List>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate("/calculator")}
                    sx={{ mt: 3 }}
                >
                    Start Calculating
                </Button>
            </Paper>
        </Container>
    );
};

export default LandingPage;
