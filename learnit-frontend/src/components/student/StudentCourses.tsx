import { useEffect, useState } from "react";
import CourseCard from "../CourseCard";
import { Grid, Typography } from "@mui/material";
import Course from "../../model/course";
import { GetCoursesByStudentId } from "../../services/api/courseService";
import useLocalStorage from "../../services/hooks/useLocalStorage";

const StudentCourses = () => {
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
    <>
      <Typography
        variant="h5"
        color="text.secondary"
        marginInlineStart={1}
        marginTop={5}
        marginBottom={2}
      >
        Courses purchased by you
      </Typography>
      {courses ? (
        <Grid container spacing={2}>
          {courses.map((course, idx) => (
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
    </>
  );
};

export default StudentCourses;
