import React, { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Divider,
} from "@mui/material";

interface Course {
    code: string;
    marks: number;
    units: number;
    grade: string;
}

interface Semester {
    name: string;
    courses: Course[];
    gpa: number | null;
}

interface AcademicYear {
    name: string;
    semesters: Semester[];
}

// Country grading scales
const gradingScales: Record<
    string,
    { min: number; grade: string; point: number }[]
> = {
    Uganda: [
        { min: 80, grade: "A", point: 5 },
        { min: 75, grade: "B+", point: 4.5 },
        { min: 70, grade: "B", point: 4 },
        { min: 65, grade: "C+", point: 3.5 },
        { min: 60, grade: "C", point: 3 },
        { min: 55, grade: "D+", point: 2.5 },
        { min: 50, grade: "D", point: 2 },
        { min: 45, grade: "E", point: 1.5 },
        { min: 40, grade: "F", point: 1 },
        { min: 0, grade: "F", point: 0 },
    ],
    USA: [
        { min: 90, grade: "A", point: 4 },
        { min: 80, grade: "B", point: 3 },
        { min: 70, grade: "C", point: 2 },
        { min: 60, grade: "D", point: 1 },
        { min: 0, grade: "F", point: 0 },
    ],
    India: [
        { min: 90, grade: "O", point: 10 },
        { min: 80, grade: "A+", point: 9 },
        { min: 70, grade: "A", point: 8 },
        { min: 60, grade: "B+", point: 7 },
        { min: 50, grade: "B", point: 6 },
        { min: 40, grade: "C", point: 5 },
        { min: 0, grade: "F", point: 0 },
    ],
};

// Get grade & point from marks based on country
const getGradeFromMarks = (marks: number, country: string) => {
    const scale = gradingScales[country];
    for (const entry of scale) {
        if (marks >= entry.min) return { grade: entry.grade, point: entry.point };
    }
    return { grade: "F", point: 0 };
};

const Calculator: React.FC = () => {
    const [country, setCountry] = useState("Uganda");
    const [academicYears, setAcademicYears] = useState<AcademicYear[]>([
        {
            name: "Year 1",
            semesters: [
                { name: "Semester 1", courses: [{ code: "", marks: 0, units: 0, grade: "" }], gpa: null },
                { name: "Semester 2", courses: [{ code: "", marks: 0, units: 0, grade: "" }], gpa: null },
            ],
        },
    ]);
    const [overallCGPA, setOverallCGPA] = useState<number | null>(null);

    const handleCountryChange = (e: any) => setCountry(e.target.value);

    // Update course data
    const handleCourseChange = (
        yearIndex: number,
        semIndex: number,
        courseIndex: number,
        field: keyof Course,
        value: string | number
    ) => {
        const newYears = [...academicYears];
        const course = newYears[yearIndex].semesters[semIndex].courses[courseIndex];

        if (field === "marks") {
            const marks = Number(value);
            course.marks = marks;
            course.grade = getGradeFromMarks(marks, country).grade;
        } else {
            (course as any)[field] = value;
        }

        setAcademicYears(newYears);
    };

    const addCourse = (yearIndex: number, semIndex: number) => {
        const newYears = [...academicYears];
        newYears[yearIndex].semesters[semIndex].courses.push({
            code: "",
            marks: 0,
            units: 0,
            grade: "",
        });
        setAcademicYears(newYears);
    };

    const addAcademicYear = () => {
        const yearIndex = academicYears.length + 1;
        const defaultSemesters =
            country === "Uganda" || country === "India"
                ? 2
                : 2; // Default 2 semesters, can customize per country
        const newYear: AcademicYear = {
            name: `Year ${yearIndex}`,
            semesters: Array.from({ length: defaultSemesters }, (_, i) => ({
                name: `Semester ${i + 1}`,
                courses: [{ code: "", marks: 0, units: 0, grade: "" }],
                gpa: null,
            })),
        };
        setAcademicYears([...academicYears, newYear]);
    };

    // Calculate GPA for a semester
    const calculateGPA = (yearIndex: number, semIndex: number) => {
        const semester = academicYears[yearIndex].semesters[semIndex];
        let totalUnits = 0;
        let totalPoints = 0;

        for (const course of semester.courses) {
            const point = getGradeFromMarks(course.marks, country).point;
            totalUnits += course.units;
            totalPoints += point * course.units;
        }

        const gpa = totalUnits > 0 ? Number((totalPoints / totalUnits).toFixed(2)) : 0;
        const newYears = [...academicYears];
        newYears[yearIndex].semesters[semIndex].gpa = gpa;
        setAcademicYears(newYears);

        calculateOverallCGPA(newYears);
    };

    // Calculate overall CGPA across all semesters
    const calculateOverallCGPA = (yearsList: AcademicYear[]) => {
        const allGPAs: number[] = [];
        yearsList.forEach((year) => {
            year.semesters.forEach((sem) => {
                if (sem.gpa !== null) allGPAs.push(sem.gpa);
            });
        });

        if (allGPAs.length === 0) {
            setOverallCGPA(null);
            return;
        }

        const avg = allGPAs.reduce((a, b) => a + b, 0) / allGPAs.length;
        setOverallCGPA(Number(avg.toFixed(2)));
    };

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" align="center" color="green" gutterBottom>
                GPA & CGPA Calculator
            </Typography>

            {/* Country Selector */}
            <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel>Country</InputLabel>
                <Select value={country} label="Country" onChange={handleCountryChange}>
                    {Object.keys(gradingScales).map((c) => (
                        <MenuItem key={c} value={c}>
                            {c}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {academicYears.map((year, yearIndex) => (
                <Box key={yearIndex} sx={{ mb: 5 }}>
                    <Typography variant="h5" color="secondary" gutterBottom>
                        {year.name}
                    </Typography>

                    {year.semesters.map((semester, semIndex) => (
                        <Paper key={semIndex} sx={{ p: 3, mb: 4 }}>
                            <Typography variant="h6" color="primary" gutterBottom>
                                {semester.name}
                            </Typography>

                            {semester.courses.map((course, courseIndex) => (
                                <Box
                                    key={courseIndex}
                                    display="flex"
                                    gap={2}
                                    flexWrap="wrap"
                                    justifyContent="space-between"
                                    sx={{ mb: 2, borderBottom: "1px dashed #ccc", pb: 2 }}
                                >
                                    <Box flex="1 1 22%">
                                        <TextField
                                            label="Course Code"
                                            value={course.code}
                                            onChange={(e) =>
                                                handleCourseChange(
                                                    yearIndex,
                                                    semIndex,
                                                    courseIndex,
                                                    "code",
                                                    e.target.value
                                                )
                                            }
                                            fullWidth
                                        />
                                    </Box>

                                    <Box flex="1 1 22%">
                                        <TextField
                                            label="Marks"
                                            type="number"
                                            value={course.marks}
                                            onChange={(e) =>
                                                handleCourseChange(
                                                    yearIndex,
                                                    semIndex,
                                                    courseIndex,
                                                    "marks",
                                                    Number(e.target.value)
                                                )
                                            }
                                            fullWidth
                                        />
                                    </Box>

                                    <Box flex="1 1 22%">
                                        <TextField
                                            label="Units"
                                            type="number"
                                            value={course.units}
                                            onChange={(e) =>
                                                handleCourseChange(
                                                    yearIndex,
                                                    semIndex,
                                                    courseIndex,
                                                    "units",
                                                    Number(e.target.value)
                                                )
                                            }
                                            fullWidth
                                        />
                                    </Box>

                                    <Box flex="1 1 22%">
                                        <TextField
                                            label="Grade"
                                            value={course.grade}
                                            InputProps={{ readOnly: true }}
                                            fullWidth
                                        />
                                    </Box>
                                </Box>
                            ))}

                            <Box display="flex" justifyContent="center" gap={2} mt={2}>
                                <Button
                                    variant="contained"
                                    color="success"
                                    onClick={() => addCourse(yearIndex, semIndex)}
                                >
                                    Add Course
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => calculateGPA(yearIndex, semIndex)}
                                >
                                    Calculate GPA
                                </Button>
                            </Box>

                            {semester.gpa !== null && (
                                <Typography
                                    variant="h6"
                                    align="center"
                                    color="secondary"
                                    sx={{ mt: 2 }}
                                >
                                    GPA for {semester.name}: <strong>{semester.gpa}</strong>
                                </Typography>
                            )}
                        </Paper>
                    ))}
                </Box>
            ))}

            <Divider sx={{ my: 3 }} />

            <Box display="flex" justifyContent="center" gap={2}>
                <Button variant="outlined" color="success" onClick={addAcademicYear}>
                    Add Academic Year
                </Button>
            </Box>

            {overallCGPA !== null && (
                <Typography variant="h5" align="center" sx={{ mt: 3 }} color="green">
                    Overall CGPA: <strong>{overallCGPA}</strong>
                </Typography>
            )}
        </Box>
    );
};

export default Calculator;
