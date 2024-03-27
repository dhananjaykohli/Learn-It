import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useLocalStorage from "../../services/hooks/useLocalStorage";
import { GetInstructor } from "../../services/api/instructorService";

const schema = z.object({
  title: z.string().nonempty({ message: "Title is required" }),
  availability: z.enum(["always", "timeBased"]),
  availableFrom: z
    .string()
    .optional()
    .refine((value) => !value || /^\d{4}-\d{2}-\d{2}$/.test(value), {
      message: "Date format should be YYYY-MM-DD",
    }),
  availableTo: z
    .string()
    .optional()
    .refine((value) => !value || /^\d{4}-\d{2}-\d{2}$/.test(value), {
      message: "Date format should be YYYY-MM-DD",
    }),
  courseStartDate: z
    .string()
    .optional()
    .refine((value) => !value || /^\d{4}-\d{2}-\d{2}$/.test(value), {
      message: "Date format should be YYYY-MM-DD",
    }),
  courseEndDate: z
    .string()
    .optional()
    .refine((value) => !value || /^\d{4}-\d{2}-\d{2}$/.test(value), {
      message: "Date format should be YYYY-MM-DD",
    }),
  imgUrl: z.string().url({ message: "Please enter a valid URL" }),
  price: z.string().nonempty({ message: "Price must be a positive number" }),
  content: z.string().nonempty({ message: "Content is required" }),
});

type FormFields = z.infer<typeof schema>;

const CourseBuilder: React.FC = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [courseId, setCourseId] = useState<number | null>(null);
  const { getItem } = useLocalStorage("user");

  const onSubmitCreateCourse: SubmitHandler<FormFields> = async (data) => {
    try {
      const newCourse = JSON.stringify({
        courseName: data.title,
        courseDescription: data.content,
        imgUrl: data.imgUrl,
        price: data.price,
        createdAt: new Date().toISOString(),
        instructorId: getItem().id,
      });

      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:5110/api/course",
        headers: {
          "Content-Type": "application/json",
        },
        data: newCourse,
      };
      const response = await axios.request(config);
      console.log(newCourse);
      console.log(response.data);
      setCourseId(response.data.courseId);
      alert("Course created successfully!");
    } catch (error) {
      console.log(error);
      alert("Error creating course. Please try again.");
    }
  };

  useEffect(() => {
    handleOpenDialogue();
  }, []);
  const handleOpenDialogue = () => {
    setOpen(true);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
  };

  return (
    <Box
      margin={2}
      padding={5}
      borderRadius={2}
      boxShadow={1}
      sx={{
        backgroundColor: "background.paper",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box marginTop={2}>
        <Typography
          variant="h5"
          sx={{ color: "primary.main", fontWeight: 600 }}
        >
          Title
        </Typography>
        <br></br>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2} width={500}>
            <TextField
              {...register("title")}
              label="Course Title"
              type="text"
              error={!!errors.title}
              helperText={errors.title?.message}
            />
            <FormControl component="fieldset">
              <Typography
                component="legend"
                variant="h5"
                sx={{ color: "primary.main", fontWeight: 600 }}
              >
                Availability
              </Typography>
              <RadioGroup {...register("availability")} defaultValue="always">
                <FormControlLabel
                  value="always"
                  control={<Radio />}
                  label="Always Available"
                />
                <FormControlLabel
                  value="timeBased"
                  control={<Radio />}
                  label="Time-Based Availability"
                />
                <TextField
                  {...register("imgUrl")}
                  label="Image URL"
                  type="text"
                  error={!!errors.imgUrl}
                  helperText={errors.imgUrl?.message}
                />
                <TextField
                  {...register("price")}
                  label="Price"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                  error={!!errors.price}
                  helperText={errors.price?.message}
                />
              </RadioGroup>
            </FormControl>
            <Typography
              component="legend"
              variant="h5"
              sx={{ color: "primary.main", fontWeight: 600 }}
            >
              Course Date
            </Typography>
            <Controller
              name="courseStartDate"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Course Start Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.courseStartDate}
                  helperText={errors.courseStartDate?.message}
                />
              )}
            />
            <Controller
              name="courseEndDate"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Course End Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.courseEndDate}
                  helperText={errors.courseEndDate?.message}
                />
              )}
            />
            <Typography
              component="legend"
              variant="h5"
              sx={{ color: "primary.main", fontWeight: 600 }}
            >
              Content
            </Typography>

            <TextField
              {...register("content")}
              label="Course Content"
              type="text"
              multiline
              rows={1}
              error={!!errors.content}
              helperText={errors.content?.message}
            />
            <Button
              variant="contained"
              color="primary"
              disabled={!courseId}
              onClick={() => {
                navigate("/instructor/coursebuilder/module");
              }}
            >
              Add Module
            </Button>
            <Button
              variant="contained"
              color="primary"
              
              onClick={() => {
                navigate("/instructor/coursebuilder/assignment", {
                  state: { courseId: courseId },
                });
              }}
            >
              Add Assignment
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={handleSubmit(onSubmitCreateCourse)}
            >
              Create Course
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default CourseBuilder;
