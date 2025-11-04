import React from "react";
import {
    Box,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button,
    Divider,
} from "@mui/material";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { AcademicYear } from "./Calculator";

interface SummaryProps {
    academicYears: AcademicYear[];
    overallCGPA: number | null;
}

const Summary: React.FC<SummaryProps> = ({ academicYears, overallCGPA }) => {
    // Prepare chart data
    const chartData = academicYears.flatMap((year) =>
        year.semesters.map((sem) => ({
            semester: `${year.name} - ${sem.name}`,
            gpa: sem.gpa ?? 0,
            isLow: (sem.gpa ?? 0) < 2.0,
        }))
    );

    // Determine class based on CGPA
    const getClass = (cgpa: number | null) => {
        if (cgpa === null) return "N/A";
        if (cgpa >= 4.5) return "First Class";
        if (cgpa >= 3.5) return "Second Upper";
        if (cgpa >= 3.0) return "Second Lower";
        if (cgpa >= 2.0) return "Pass";
        return "Fail";
    };

    // Export PDF
    const exportPDF = () => {
        const doc = new jsPDF();
        let startY = 20;

        academicYears.forEach((year) => {
            doc.setFontSize(14);
            doc.text(year.name, 14, startY - 5);

            const tableData: (string | number)[][] = [];

            year.semesters.forEach((sem) => {
                sem.courses.forEach((course) => {
                    tableData.push([sem.name, course.code, course.grade, sem.gpa ?? "N/A"]);
                });
            });

            autoTable(doc, {
                head: [["Semester", "Course Code", "Marks/Grade", "GPA"]],
                body: tableData,
                startY,
                theme: "grid",
                headStyles: { fillColor: [34, 139, 34], textColor: 255 },
            });

            startY = (doc as any).lastAutoTable.finalY + 10;
        });

        doc.setFontSize(12);
        doc.text(`Overall CGPA: ${overallCGPA ?? "N/A"}`, 14, startY + 5);
        doc.text(`Class: ${getClass(overallCGPA)}`, 14, startY + 12);
        doc.save("Academic_Summary.pdf");
    };

    // Custom dot for GPA trend chart
    const renderDot = (props: any) => {
        const { cx, cy, payload } = props;
        if (cx === undefined || cy === undefined || !payload) {
            return <circle cx={0} cy={0} r={0} fill="transparent" />;
        }
        return (
            <circle
                cx={cx}
                cy={cy}
                r={6}
                fill={payload.isLow ? "red" : "#228B22"}
                stroke="#000"
                strokeWidth={1}
            />
        );
    };

    return (
        <Box sx={{ p: 4, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
            <Typography variant="h4" align="center" gutterBottom color="primary">
                Academic Summary
            </Typography>

            <Divider sx={{ mb: 3 }} />

            {/* Semester Tables */}
            {academicYears.map((year, yearIndex) => (
                <Paper
                    key={yearIndex}
                    sx={{
                        p: 3,
                        mb: 4,
                        borderRadius: 3,
                        boxShadow: 3,
                        backgroundColor: "#ffffff",
                    }}
                >
                    <Typography variant="h5" color="secondary" gutterBottom>
                        {year.name}
                    </Typography>

                    <Table sx={{ mt: 2 }}>
                        <TableHead sx={{ backgroundColor: "#228B22" }}>
                            <TableRow>
                                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                                    Semester
                                </TableCell>
                                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                                    Courses
                                </TableCell>
                                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                                    Grades
                                </TableCell>
                                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                                    GPA
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {year.semesters.map((sem, i) => (
                                <TableRow
                                    key={i}
                                    sx={{
                                        "&:hover": { backgroundColor: "#e0f2f1" },
                                        color: (sem.gpa ?? 0) < 2 ? "red" : "inherit",
                                    }}
                                >
                                    <TableCell>{sem.name}</TableCell>
                                    <TableCell>
                                        {sem.courses.map((c) => c.code).join(", ")}
                                    </TableCell>
                                    <TableCell>
                                        {sem.courses.map((c) => c.grade).join(", ")}
                                    </TableCell>
                                    <TableCell
                                        sx={{ color: (sem.gpa ?? 0) < 2 ? "red" : "inherit" }}
                                    >
                                        {sem.gpa ?? "N/A"}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            ))}

            {/* Overall CGPA and Class */}
            <Paper
                sx={{
                    p: 3,
                    mb: 4,
                    borderRadius: 3,
                    backgroundColor: "#e8f5e9",
                    textAlign: "center",
                }}
            >
                <Typography variant="h5" color="green">
                    Overall CGPA: <strong>{overallCGPA ?? "N/A"}</strong>
                </Typography>
                <Typography variant="h6" sx={{ mt: 1 }}>
                    Class: <strong>{getClass(overallCGPA)}</strong>
                </Typography>
            </Paper>

            {/* GPA Trend Chart */}
            <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3, backgroundColor: "#ffffff" }}>
                <Typography variant="h6" gutterBottom>
                    GPA Trend Chart
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                        data={chartData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="semester" />
                        <YAxis domain={[0, 5]} />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="gpa"
                            stroke="#228B22"
                            strokeWidth={3}
                            dot={renderDot}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </Paper>

            {/* Export PDF */}
            <Box display="flex" justifyContent="center" sx={{ mt: 3 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={exportPDF}
                    sx={{ px: 4, py: 1.5 }}
                >
                    Export as PDF
                </Button>
            </Box>
        </Box>
    );
};

export default Summary;
