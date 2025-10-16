import React, { useState } from "react";
import { Container, Typography, TextField, Button, Paper, List, ListItem, ListItemText } from "@mui/material";

interface Semester {
  marks: number[];
  gpa: number;
}

const Calculator: React.FC = () => {
  const [marks, setMarks] = useState<number[]>([]);
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [gpa, setGpa] = useState<number | null>(null);
  const [cgpa, setCgpa] = useState<number | null>(null);

  const handleAddMark = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const newMarks = [...marks];
    let value = Number(e.target.value);
    if (value < 0) value = 0;
    if (value > 100) value = 100;
    newMarks[index] = value;
    setMarks(newMarks);
  };

  const addSubject = () => {
    setMarks([...marks, 0]);
  };

  const calculateGPA = (marks: number[]): number => {
    const toPoints = (mark: number): number => {
      if (mark >= 80) return 5.0;
      if (mark >= 75) return 4.5;
      if (mark >= 70) return 4.0;
      if (mark >= 65) return 3.5;
      if (mark >= 60) return 3.0;
      if (mark >= 50) return 2.0;
      return 0.0;
    };
    const totalPoints = marks.reduce((acc, mark) => acc + toPoints(mark), 0);
    return marks.length > 0 ? totalPoints / marks.length : 0;
  };

  const saveSemester = () => {
    const semesterGPA = calculateGPA(marks);
    setSemesters([...semesters, { marks: [...marks], gpa: semesterGPA }]);
    setMarks([]);
    setGpa(semesterGPA);

    // Recalculate CGPA
    const allPoints = semesters.reduce((acc, sem) => acc + sem.gpa * sem.marks.length, semesterGPA * marks.length);
    const allSubjects = semesters.reduce((acc, sem) => acc + sem.marks.length, marks.length);
    setCgpa(allSubjects > 0 ? allPoints / allSubjects : 0);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" gutterBottom color="primary">
          GPA Calculator
        </Typography>

        {marks.map((mark, index) => (
          <TextField
            key={index}
            label={`Subject ${index + 1} Marks`}
            type="number"
            value={mark}
            onChange={(e) => handleAddMark(e, index)}
            fullWidth
            sx={{ mt: 2 }}
          />
        ))}

        <Button variant="outlined" color="secondary" onClick={addSubject} sx={{ mt: 2 }}>
          Add Subject
        </Button>
        <Button variant="contained" color="primary" onClick={saveSemester} sx={{ mt: 2, ml: 2 }}>
          Save Semester
        </Button>

        {gpa !== null && (
          <Typography variant="h6" sx={{ mt: 3 }}>
            Latest Semester GPA: {gpa.toFixed(2)}
          </Typography>
        )}
        {cgpa !== null && (
          <Typography variant="h6" sx={{ mt: 1 }}>
            CGPA: {cgpa.toFixed(2)}
          </Typography>
        )}

        {semesters.length > 0 && (
          <>
            <Typography variant="h6" sx={{ mt: 3 }}>
              Saved Semesters
            </Typography>
            <List>
              {semesters.map((sem, i) => (
                <ListItem key={i}>
                  <ListItemText primary={`Semester ${i + 1} GPA: ${sem.gpa.toFixed(2)}`} />
                </ListItem>
              ))}
            </List>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default Calculator;
