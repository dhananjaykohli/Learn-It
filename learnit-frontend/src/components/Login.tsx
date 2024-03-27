import {
  Alert,
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { AuthInstructor } from "../services/api/instructorService";
import { AuthStudent } from "../services/api/studentService";
import { useState } from "react";
import useLocalStorage from "../services/hooks/useLocalStorage";
import { AxiosError } from "axios";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  role: z.string().min(1, { message: "Please select a role" }),
});

type FormFields = z.infer<typeof schema>;

const Login = () => {
  const navigate = useNavigate();
  const { setItem } = useLocalStorage("user");
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const id =
        data.role === "instructor"
          ? await AuthInstructor(data.email, data.password)
          : await AuthStudent(data.email, data.password);
      navigate(
        data.role === "instructor" ? "/instructor/home" : "/student/home",
        {
          replace: true,
        }
      );
      setItem({ id: id.id, role: data.role });
      alert("Logged in successfully!");
    } catch (error) {
      alert("Email or password is invalid!");
      setError("root", {
        message: `${error}`,
      });
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Stack margin={15} alignItems="center">
      <Typography variant="h2">Login</Typography>
      <Box margin={5}>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2} width={400}>
            <TextField
              {...register("email")}
              label="Email"
              type="email"
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              {...register("password")}
              label="Password"
              type={showPassword ? "text" : "password"}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      {showPassword ? (
                        <VisibilityOff fontSize="small" />
                      ) : (
                        <Visibility fontSize="small" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Controller
              name="role"
              control={control}
              defaultValue="student"
              render={({ field }) => (
                <FormControl component="fieldset">
                  <FormLabel component="legend">Select Role</FormLabel>
                  <RadioGroup row aria-label="role" {...field}>
                    <FormControlLabel
                      value="student"
                      control={<Radio />}
                      label="Student"
                    />
                    <FormControlLabel
                      value="instructor"
                      control={<Radio />}
                      label="Instructor"
                    />
                  </RadioGroup>
                </FormControl>
              )}
            />
            {errors.role && (
              <Alert severity="error">{errors.role.message}</Alert>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Loading..." : "Login"}
            </Button>
            <Button
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              onClick={() => navigate(-1)}
            >
              Go Back
            </Button>
          </Stack>
        </form>
      </Box>
    </Stack>
  );
};

export default Login;
