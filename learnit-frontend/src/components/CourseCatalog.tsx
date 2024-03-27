import { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import { Grid, Typography } from "@mui/material";
import Course from "../model/course";
import { GetCourses } from "../services/api/courseService";

const CourseCatalog = () => {
  const [courses, setCourses] = useState<Course[] | null>(null);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await GetCourses();
        setCourses(data);
      } catch (error) {
        console.error(`Error fetching courses: ${error}`);
      }
    };
    fetchCourses();
  }, []);

  return (
    <>
      <Typography
        variant="h5"
        color="text.secondary"
        marginInlineStart={1}
        marginTop={5}
        marginBottom={2}
      >
        Explore all the courses
      </Typography>
      {courses ? (
        <Grid container spacing={2}>
          {courses.map((course, idx) => (
            <Grid item key={idx} md={4} xs={8} sm={8} alignItems="center">
              <CourseCard
                id={course.courseId}
                linkTo={`/course/${course.courseId}`}
                title={course.courseName}
                description={course.courseDescription}
                imgUrl={course.imgUrl}
                includePrice={true}
                price={course.price}
                createdAt={new Date(course.createdAt)}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        "Loading..."
      )}
    </>
  );
};

export default CourseCatalog;
