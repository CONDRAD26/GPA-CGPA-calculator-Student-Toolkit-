import React, { useState, ChangeEvent } from "react";
import {
    Container,
    Typography,
    TextField,
    Button,
    Box,
    Grid,
    Paper,
} from "@mui/material";

const Calculator: React.FC = () => {
    const [marks, setMarks] = useState<number[]>([]);
    const [result, setResult] = useState<string>("");

    // ✅ Handles both input and textarea safely
    const handleAddMark = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index: number
    ) => {
        const newMarks = [...marks];
        newMarks[index] = Number(e.target.value);
        setMarks(newMarks);
    };

    const addField = () => {
        setMarks([...marks, 0]);
    };

    const calculateGPA = () => {
        if (marks.length === 0) {
            setResult("Please add at least one course.");
            return;
        }

        const sum = marks.reduce((acc, val) => acc + val, 0);
        const gpa = sum / marks.length;
        setResult(`Your GPA is: ${gpa.toFixed(2)}`);
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
                <Typography variant="h4" gutterBottom>
                    GPA Calculator
                </Typography>

                {marks.map((mark, index) => (
                    <TextField
                        key={index}
                        label={`Course ${index + 1} Mark`}
                        type="number"
                        value={mark}
                        onChange={(e) => handleAddMark(e, index)} // ✅ fixed
                        fullWidth
                        sx={{ mt: 2 }}
                    />
                ))}

                <Box sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Button
                                variant="contained"
                                fullWidth
                                color="primary"
                                onClick={addField}
                            >
                                Add Course
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                variant="contained"
                                fullWidth
                                color="success"
                                onClick={calculateGPA}
                            >
                                Calculate GPA
                            </Button>
                        </Grid>
                    </Grid>
                </Box>

                {result && (
                    <Typography variant="h6" sx={{ mt: 3 }}>
                        {result}
                    </Typography>
                )}
            </Paper>
        </Container>
    );
};

export default Calculator;
