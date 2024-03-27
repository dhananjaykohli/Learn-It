import { Typography, Button, Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetCoursesByStudentId } from "../../services/api/courseService";
import Course from "../../model/course";
import useLocalStorage from "../../services/hooks/useLocalStorage";
import CourseCard from "../CourseCard";

const StudentHome = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const { getItem } = useLocalStorage("user");
  const id = getItem().id;
  useEffect(() => {
    const fetchCoursesByStudentId = async () => {
      try {
        const data = await GetCoursesByStudentId(id);
        setCourses(data);
      } catch (error) {
        console.error(`Error fetching courses: ${error}`);
      }
    };
    fetchCoursesByStudentId();
  }, [id]);
  return (
    <Container maxWidth="lg" sx={{ minHeight: "100vh" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            Welcome to Learnit!
          </Typography>
          <Typography variant="body1" gutterBottom>
            Welcome to the future of learning, where convenience meets
            innovation. Our platform offers a wide range of online courses
            designed to enhance your skills, expand your knowledge, and open up
            new opportunities. Whether you're looking to advance in your career,
            explore new hobbies, or simply learn something new, we've got you
            covered.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ marginTop: "20px" }}
            onClick={() => navigate("/courses")}
          >
            Browse all courses
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <img
            src="https://logodix.com/logo/2149417.png"
            alt="Welcome Image"
            style={{ width: "60%", height: "auto" }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Featured Courses
          </Typography>
          {courses ? (
            <Grid container spacing={2}>
              {courses.slice(0, 3).map((course, idx) => (
                <Grid item key={idx} md={4} xs={8} sm={8} alignItems="center">
                  <CourseCard
                    id={course.courseId}
                    linkTo={`/student/course/${course.courseId}/module`}
                    title={course.courseName}
                    description={course.courseDescription}
                    imgUrl={course.imgUrl}
                    includePrice={false}
                    price={course.price}
                    createdAt={new Date(course.createdAt)}
                    showProgress={true}
                    progress={course.progress}
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            "Loading the courses..."
          )}
          <Button
            variant="outlined"
            color="primary"
            size="large"
            style={{ marginTop: "20px" }}
            onClick={() => navigate("/student/courses")}
          >
            Show More
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default StudentHome;
