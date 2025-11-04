import React, { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
} from "@mui/material";

interface Course {
    code: string;
    units: number;
    grade: string;
}

const gradePoints: Record<string, number> = {
    A: 5,
    B: 4,
    C: 3,
    D: 2,
    E: 1,
    F: 0,
};

const Calculator: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([
        { code: "", units: 0, grade: "" },
    ]);
    const [gpa, setGPA] = useState<number | null>(null);

    const handleCourseChange = (
        index: number,
        field: keyof Course,
        value: string | number
    ) => {
        const newCourses = [...courses];
        (newCourses[index] as any)[field] = value;
        setCourses(newCourses);
    };

    const addCourse = () => {
        setCourses([...courses, { code: "", units: 0, grade: "" }]);
    };

    const calculateGPA = () => {
        let totalUnits = 0;
        let totalPoints = 0;

        for (const course of courses) {
            const points = gradePoints[course.grade.toUpperCase()] ?? 0;
            totalUnits += course.units;
            totalPoints += points * course.units;
        }

        if (totalUnits === 0) {
            setGPA(0);
            return;
        }

        const result = totalPoints / totalUnits;
        setGPA(Number(result.toFixed(2)));
    };

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom align="center" color="green">
                GPA Calculator
            </Typography>

            {courses.map((course, index) => (
                <Paper
                    key={index}
                    sx={{
                        p: 2,
                        mb: 2,
                        border: "1px solid #ccc",
                        borderRadius: 2,
                    }}
                >
                    <Box
                        display="flex"
                        gap={2}
                        flexWrap="wrap"
                        justifyContent="space-between"
                    >
                        <Box flex="1 1 30%">
                            <TextField
                                label="Course Code"
                                value={course.code}
                                onChange={(e) =>
                                    handleCourseChange(index, "code", e.target.value)
                                }
                                fullWidth
                            />
                        </Box>

                        <Box flex="1 1 30%">
                            <TextField
                                label="Course Units"
                                type="number"
                                value={course.units}
                                onChange={(e) =>
                                    handleCourseChange(index, "units", Number(e.target.value))
                                }
                                fullWidth
                            />
                        </Box>

                        <Box flex="1 1 30%">
                            <TextField
                                label="Grade"
                                value={course.grade}
                                onChange={(e) =>
                                    handleCourseChange(index, "grade", e.target.value)
                                }
                                fullWidth
                            />
                        </Box>
                    </Box>
                </Paper>
            ))}

            <Box display="flex" justifyContent="center" gap={2} mt={3}>
                <Button variant="contained" color="success" onClick={addCourse}>
                    Add Course
                </Button>
                <Button variant="contained" color="primary" onClick={calculateGPA}>
                    Calculate GPA
                </Button>
            </Box>

            {gpa !== null && (
                <Typography variant="h6" align="center" sx={{ mt: 3 }}>
                    Your GPA: <strong>{gpa}</strong>
                </Typography>
            )}
        </Box>
    );
};

export default Calculator;
