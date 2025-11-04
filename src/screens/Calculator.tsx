// src/screens/Calculator.tsx
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
    LinearProgress,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Summary from "./Summary";

export interface Course {
    code: string;
    marks: number;
    units: number;
    grade: string;
}

export interface Semester {
    name: string;
    courses: Course[];
    gpa: number | null;
    completed: boolean;
}

export interface AcademicYear {
    name: string;
    semesters: Semester[];
    currentSemesterIndex: number;
}

const gradingScales: Record<string, { min: number; grade: string; point: number }[]> = {
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

const getGradeFromMarks = (marks: number, country: string) => {
    const scale = gradingScales[country];
    for (const entry of scale) {
        if (marks >= entry.min) return { grade: entry.grade, point: entry.point };
    }
    return { grade: "F", point: 0 };
};

const gpaColor = (gpa: number, country: string) => {
    const high = country === "India" ? 8 : 4;
    const low = country === "India" ? 5 : 2;
    if (gpa >= high) return "green";
    if (gpa >= low) return "orange";
    return "red";
};

const Calculator: React.FC = () => {
    const [country, setCountry] = useState("Uganda");
    const [academicYears, setAcademicYears] = useState<AcademicYear[]>([
        {
            name: "Year 1",
            currentSemesterIndex: 0,
            semesters: [
                { name: "Semester 1", courses: [{ code: "", marks: 0, units: 0, grade: "" }], gpa: null, completed: false },
                { name: "Semester 2", courses: [{ code: "", marks: 0, units: 0, grade: "" }], gpa: null, completed: false },
            ],
        },
    ]);
    const [overallCGPA, setOverallCGPA] = useState<number | null>(null);
    const [showSummary, setShowSummary] = useState(false);

    const handleCountryChange = (e: any) => setCountry(e.target.value);

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
        newYears[yearIndex].semesters[semIndex].courses.push({ code: "", marks: 0, units: 0, grade: "" });
        setAcademicYears(newYears);
    };

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
        newYears[yearIndex].semesters[semIndex].completed = true;
        setAcademicYears(newYears);
        calculateOverallCGPA(newYears);
    };

    const nextSemester = (yearIndex: number) => {
        const newYears = [...academicYears];
        if (newYears[yearIndex].currentSemesterIndex + 1 < newYears[yearIndex].semesters.length) {
            newYears[yearIndex].currentSemesterIndex += 1;
            setAcademicYears(newYears);
        }
    };

    const addAcademicYear = () => {
        const yearIndex = academicYears.length + 1;
        const newYear: AcademicYear = {
            name: `Year ${yearIndex}`,
            currentSemesterIndex: 0,
            semesters: [
                { name: "Semester 1", courses: [{ code: "", marks: 0, units: 0, grade: "" }], gpa: null, completed: false },
                { name: "Semester 2", courses: [{ code: "", marks: 0, units: 0, grade: "" }], gpa: null, completed: false },
            ],
        };
        setAcademicYears([...academicYears, newYear]);
    };

    const calculateOverallCGPA = (yearsList: AcademicYear[]) => {
        const allGPAs: number[] = [];
        yearsList.forEach((year) => {
            year.semesters.forEach((sem) => {
                if (sem.gpa !== null) allGPAs.push(sem.gpa);
            });
        });
        setOverallCGPA(allGPAs.length > 0 ? Number((allGPAs.reduce((a, b) => a + b, 0) / allGPAs.length).toFixed(2)) : null);
    };

    if (showSummary) return <Summary academicYears={academicYears} overallCGPA={overallCGPA} />;

    return (
        <Box sx={{ p: { xs: 2, sm: 4 } }}>
            <Typography variant="h4" align="center" color="green" gutterBottom>
                GPA & CGPA Calculator
            </Typography>

            <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel>Country</InputLabel>
                <Select value={country} label="Country" onChange={handleCountryChange}>
                    {Object.keys(gradingScales).map((c) => (
                        <MenuItem key={c} value={c}>{c}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            {academicYears.map((year, yearIndex) => {
                const completedSemesters = year.semesters.filter((s) => s.completed).length;
                const progress = (completedSemesters / year.semesters.length) * 100;

                return (
                    <Accordion key={yearIndex} defaultExpanded>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">{year.name}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <LinearProgress variant="determinate" value={progress} sx={{ mb: 2, height: 10, borderRadius: 5 }} />
                            {year.semesters.map((semester, semIndex) => {
                                const isActive = semIndex === year.currentSemesterIndex;
                                return (
                                    <Accordion key={semIndex} sx={{ mb: 2 }} defaultExpanded={isActive}>
                                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                            <Typography variant="subtitle1" color={isActive ? "primary" : "textSecondary"}>
                                                {semester.name} {semester.completed && `- GPA: ${semester.gpa}`}
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            {semester.courses.map((course, courseIndex) => (
                                                <Box
                                                    key={courseIndex}
                                                    display="flex"
                                                    gap={2}
                                                    flexWrap="wrap"
                                                    justifyContent="space-between"
                                                    sx={{ mb: 2, borderBottom: "1px dashed #ccc", pb: 1 }}
                                                >
                                                    <TextField
                                                        label="Course Code"
                                                        value={course.code}
                                                        onChange={(e) =>
                                                            handleCourseChange(yearIndex, semIndex, courseIndex, "code", e.target.value)
                                                        }
                                                        sx={{ flex: "1 1 45%", minWidth: 120 }}
                                                    />
                                                    <TextField
                                                        label="Marks"
                                                        type="number"
                                                        value={course.marks}
                                                        onChange={(e) =>
                                                            handleCourseChange(yearIndex, semIndex, courseIndex, "marks", Number(e.target.value))
                                                        }
                                                        sx={{ flex: "1 1 45%", minWidth: 120 }}
                                                    />
                                                    <TextField
                                                        label="Units"
                                                        type="number"
                                                        value={course.units}
                                                        onChange={(e) =>
                                                            handleCourseChange(yearIndex, semIndex, courseIndex, "units", Number(e.target.value))
                                                        }
                                                        sx={{ flex: "1 1 45%", minWidth: 120 }}
                                                    />
                                                    <TextField
                                                        label="Grade"
                                                        value={course.grade}
                                                        InputProps={{ readOnly: true }}
                                                        sx={{ flex: "1 1 45%", minWidth: 120 }}
                                                    />
                                                </Box>
                                            ))}

                                            <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2} mt={2}>
                                                <Button variant="contained" color="success" onClick={() => addCourse(yearIndex, semIndex)}>
                                                    Add Course
                                                </Button>
                                                <Button variant="contained" color="primary" onClick={() => calculateGPA(yearIndex, semIndex)}>
                                                    Calculate GPA
                                                </Button>
                                                {isActive && semester.completed && (
                                                    <Button variant="outlined" color="secondary" onClick={() => nextSemester(yearIndex)}>
                                                        Next Semester
                                                    </Button>
                                                )}
                                            </Box>
                                        </AccordionDetails>
                                    </Accordion>
                                );
                            })}
                        </AccordionDetails>
                    </Accordion>
                );
            })}

            <Divider sx={{ my: 3 }} />
            <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2} mb={3}>
                <Button variant="outlined" color="success" onClick={addAcademicYear}>
                    Add Academic Year
                </Button>
                <Button variant="contained" color="secondary" onClick={() => setShowSummary(true)}>
                    View Summary
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
