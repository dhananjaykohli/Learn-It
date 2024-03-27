import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  Button,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { GetInstructor } from "../../services/api/instructorService";
import Instructor from "../../model/instructor";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import useLocalStorage from "../../services/hooks/useLocalStorage";
const InstructorProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { removeItem } = useLocalStorage("user");
  const [instructor, setinstructor] = useState<Partial<Instructor>>({});
  useEffect(() => {
    try {
      const fetchStudent = async () => {
        if (!id) {
          throw new Error("id not present in the route parameter");
        }
        const student = await GetInstructor(+id);
        setinstructor(student);
      };
      fetchStudent();
    } catch (error) {
      alert(`${error}`);
    }
  }, [id]);

  const navigate = useNavigate();

  const handleLogout = () => {
    removeItem();
    navigate("/");
  };
  const handleEditButton = () => {
    navigate("edit");
  };

  return (
    <Card
      sx={{
        width: "100%",
        margin: "auto",
        marginTop: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <CardContent>
        <Typography variant="h4" component="div" sx={{ marginBottom: 2 }}>
          Welcome, {instructor.instructorName}!
        </Typography>
        <PersonOutlineIcon sx={{ width: 100, height: 100 }} />
        <Typography variant="h5" component="div" sx={{ marginTop: 2 }}>
          {instructor.instructorName}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {instructor.email}
        </Typography>
        <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          {instructor.bio}
        </Typography>
        <Box sx={{ marginTop: 1 }}></Box>

        <Button
          variant="contained"
          color="primary"
          onClick={handleEditButton}
          sx={{ marginTop: 2 }}
        >
          Edit Profile
        </Button>
        <br></br>
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogout}
          sx={{ marginTop: 2 }}
        >
          Logout
        </Button>
      </CardContent>
    </Card>
  );
};

export default InstructorProfile;
