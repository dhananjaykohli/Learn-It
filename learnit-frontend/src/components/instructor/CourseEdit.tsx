import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Course from "../../model/course";

const CourseEdit = () => {
  const [course, setCourse] = useState<Course>({
    courseId: 0,
    courseName: " ",
    courseDescription: " ",
    imgUrl: " ",
    price: 0,
    createdAt: " ",
    instructorId: 0,
  });
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get<Course>(
          `http://localhost:5110/api/course/${id}`
        );
        setCourse(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };

    fetchCourse();
  }, [id]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCourse({ ...course, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:5110/api/course/${id}`, course);
      alert("Course updated successfully");
      navigate(-1);
    } catch (error) {
      console.error("Error updating course:", error);
      alert("Course updation unsuccessful");
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Box component="form" onSubmit={handleSubmit} width={400} padding={2}>
        <h1> Edit course</h1>
        <TextField
          fullWidth
          label="Name"
          name="courseName"
          value={course.courseName}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Description"
          name="courseDescription"
          value={course.courseDescription}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="URL"
          name="imgUrl"
          value={course.imgUrl}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          type="number"
          label="Price"
          name="price"
          value={course.price}
          onChange={handleChange}
          margin="normal"
        />

        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default CourseEdit;
