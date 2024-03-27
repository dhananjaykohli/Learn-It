import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CourseCard from "../CourseCard";
import { GetTopCoursesByCourseId } from "../../services/api/courseService";
import { useParams } from "react-router-dom";
import Course from "../../model/course";

const FreqBoughtCourses = () => {
  const [courses, setCourses] = useState<Course[] | null>(null);
  const { id } = useParams();
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await GetTopCoursesByCourseId(Number(id));
        setCourses(data);
      } catch (error) {
        console.error(`Error fetching courses: ${error}`);
      }
    };
    fetchCourses();
  }, [id]);

  return (
    <>
      <Typography
        variant="h5"
        color="text.secondary"
        marginInlineStart={1}
        marginTop={5}
        marginBottom={2}
      >
        Frequently bought courses
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
        "Loading frequently bought courses..."
      )}
    </>
  );
};

export default FreqBoughtCourses;
