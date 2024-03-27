import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Course from "../../model/course";
import { GetTimeTable } from "../../services/api/courseService";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  Typography,
  Box,
  Container,
} from "@mui/material";

const TimeTable = () => {
  const { id } = useParams<{ id: string }>();
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTimeTable = async () => {
      setIsLoading(true);
      setError(null);

      try {
        if (!id) {
          setError("Invalid ID");
          return;
        }

        const fetchedCourses = await GetTimeTable(+id);
        setCourses(fetchedCourses);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Unknown error");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchTimeTable();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container maxWidth="md">
      <Box display="flex" flexDirection="column" alignItems="center" py={6}>
        <Typography variant="h4" gutterBottom>
          Time Table
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Course Name</TableCell>
                <TableCell align="center">Course Start Date</TableCell>
                <TableCell align="center">Completion Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.courseId}>
                  <TableCell align="center">{course.courseName}</TableCell>
                  <TableCell align="center">
                    {new Date(course.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="center">
                    {new Date(
                      new Date(course.createdAt).getTime() +
                        30 * 24 * 60 * 60 * 1000
                    ).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default TimeTable;
