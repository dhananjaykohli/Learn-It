import { Button, Box, Typography, Stack } from "@mui/material";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <Stack margin={25} alignItems="center">
      <Typography variant="h2">Signup as</Typography>
      <Box margin={10}>
        <Stack spacing={4} direction="row">
          <Button
            component={Link}
            to="/student/signup"
            variant="contained"
            size="large"
          >
            a student
          </Button>
          <Button
            component={Link}
            to="/instructor/signup"
            variant="contained"
            size="large"
          >
            an instructor
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
};

export default SignUp;
