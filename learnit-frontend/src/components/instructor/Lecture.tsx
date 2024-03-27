import React, { useState } from "react";
import { Box, Button, TextField, Typography, Stack } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Lecture: React.FC = () => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [duration, setDuration] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDuration(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name || !url || !duration) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5110/api/lecture", {
        lectureName: name,
        lectureURL: url,
        lectureDuration: duration,
        moduleId: location.state.moduleId,
      });
      console.log(response);
      setName("");
      setUrl("");
      setDuration("");

      alert("Lecture successfully added");

      navigate("/instructor/coursebuilder/module");
    } catch (error) {
      // Show error alert
      alert("Error: Unable to add lecture");

      console.error("Error adding lecture:", error);
    }
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
          Lecture
        </Typography>
        <br />
        <form onSubmit={handleSubmit}>
          <Stack spacing={2} width={500}>
            <TextField
              label="Lecture Name"
              type="text"
              value={name}
              onChange={handleNameChange}
            />
            <TextField
              label="Lecture URL"
              type="url"
              value={url}
              onChange={handleUrlChange}
            />
            <TextField
              label="Lecture Duration"
              type="text"
              value={duration}
              onChange={handleDurationChange}
            />
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default Lecture;
