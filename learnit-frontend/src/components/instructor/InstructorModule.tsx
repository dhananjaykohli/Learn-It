import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Module from "../../model/module";
import axios from "axios";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
  Box,
  Stack,
} from "@mui/material";

const StartModules: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [modules, setModules] = useState<Module[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const commentResponse = await axios.get(
          `http://localhost:5110/api/course/${id}`
        );
        setModules(commentResponse.data.modules);
        console.log(commentResponse.data.modules);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchModules();
  }, [id]);

  return (
    <>
      <Typography variant="h6">Modules</Typography>
      <Box minHeight="55vh">
        <List>
          {modules.map((module, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={module.moduleName}
                secondary={`Duration: ${module.moduleDuration}`}
              />
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    navigate(`/instructor/module/${module.moduleId}/quiz`)
                  }
                >
                  Add Quiz
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    navigate(`/instructor/module/${module.moduleId}/edit`)
                  }
                >
                  Edit Module
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    navigate(`/instructor/module/${module.moduleId}/lectures`)
                  }
                >
                  View Lectures
                </Button>
              </Stack>
            </ListItem>
          ))}
        </List>

        <Stack direction="row" spacing={2} sx={{ marginTop: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(`/instructor/course/${id}`)}
        >
          Edit Course
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(`/course/description/${id}`)}
        >
          Change Description
        </Button>
      </Stack>

      </Box>
    </>
  );
};

export default StartModules;
