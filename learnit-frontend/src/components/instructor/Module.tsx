import React, { useState } from "react";
import { Box, Button, TextField, Typography, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios library

const Module: React.FC = () => {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [moduleId, setModuleId] = useState<number | null>(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDuration(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name || !duration) {
      setError("All fields are required");
      return;
    }

    // Sending data to the server using axios
    axios
      .post("http://localhost:5110/api/module", {
        moduleName: name,
        moduleDuration: duration,
        lectures: [],
        courses: [],
      })
      .then((response) => {
        setModuleId(response.data.moduleId);
        alert("module added successfully");
        navigate("/instructor/coursebuilder/module");
      })
      .catch((error) => {
        console.error(error);
        alert("error adding module");
        setError("Failed to submit data");
      });
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
          Module
        </Typography>
        <br></br>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2} width={500}>
            <TextField
              label="Module Name"
              type="text"
              value={name}
              onChange={handleNameChange}
            />
            <TextField
              label="Duration"
              type="text"
              value={duration}
              onChange={handleDurationChange}
            />
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
            {/* Button to navigate to "/instructor/module/lecture" */}
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                navigate(
                  "/instructor/coursebuilder/module/lecture" , {state: {moduleId: moduleId}}
                )
              }
            >
              Add Lecture
            </Button>
            {/* <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate("/quiz")}
            >
              Add quiz to your module
            </Button> */}
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default Module;
