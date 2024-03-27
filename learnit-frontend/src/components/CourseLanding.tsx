import React, { useEffect, useReducer } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  Container,
  Typography,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { AccessTimeFilled as AccessTimeFilledIcon } from "@mui/icons-material";
import axios from "axios";
import FreqBoughtCourses from "./student/FreqBoughtCourses";
import useLocalStorage from "../services/hooks/useLocalStorage";

interface Module {
  id: number;
  title: string;
  duration: string;
}

interface State {
  description: string;
  name_v: string;
  openDialog: boolean;
  modules: Module[];
}

type Action =
  | { type: "SET_DESCRIPTION"; payload: string }
  | { type: "SET_NAME"; payload: string }
  | { type: "SET_OPEN_DIALOG"; payload: boolean }
  | { type: "SET_MODULES"; payload: Module[] };

const initialState: State = {
  description: "",
  name_v: "",
  openDialog: false,
  modules: [
    { id: 1, title: "Module 1", duration: "30 mins" },
    { id: 2, title: "Module 2", duration: "45 mins" },
    { id: 3, title: "Module 3", duration: "50 mins" },
    { id: 4, title: "Module 4", duration: "35 mins" },
    { id: 5, title: "Module 5", duration: "55 mins" },
  ],
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_DESCRIPTION":
      return { ...state, description: action.payload };
    case "SET_NAME":
      return { ...state, name_v: action.payload };
    case "SET_OPEN_DIALOG":
      return { ...state, openDialog: action.payload };
    case "SET_MODULES":
      return { ...state, modules: action.payload };
    default:
      return state;
  }
};

const CourseLandingPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { getItem } = useLocalStorage("user");
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseResponse = await axios.get(
          `http://localhost:5110/api/course/${id}`
        );
        console.log(courseResponse.data);
        dispatch({
          type: "SET_DESCRIPTION",
          payload: courseResponse.data.courseDescription,
        });
        dispatch({ type: "SET_NAME", payload: courseResponse.data.courseName });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  const handleOrderClick = () => {
    if (getItem()) {
      navigate("/payment");
    } else {
      dispatch({ type: "SET_OPEN_DIALOG", payload: true });
    }
  };

  return (
    <Container maxWidth="md">
      <Typography
        variant="h5"
        align="center"
        color="primary"
        sx={{ color: "#3498db", fontWeight: "bold" }}
      >
        COURSE LANDING PAGE
      </Typography>
      <br />
      <br />
      <Card
        sx={{
          background: "rgba(175, 219, 245, 1)",
          padding: "20px",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "0 10px",
          height: "10%",
        }}
      >
        <div style={{ flex: 1, marginRight: "40px", fontWeight: "bold" }}>
          <Typography variant="h5">{state.name_v}</Typography>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <AccessTimeFilledIcon sx={{ color: "#3498db" }} />
          <span style={{ marginLeft: "5px" }}>2 Hours</span>
          <Button
            variant="contained"
            onClick={handleOrderClick}
            sx={{
              borderRadius: "5px",
              background: "#3498db",
              color: "white",
              padding: "12px",
              cursor: "pointer",
              marginLeft: "10px",
            }}
          >
            ORDER NOW
          </Button>
        </div>
      </Card>
      <br />
      <br />
      <div>
        <br />
        <br />
        <Typography
          variant="h5"
          align="center"
          color="primary"
          sx={{ color: "#3498db", fontWeight: "bold" }}
        >
          Course Descripton
        </Typography>
        <Card
          sx={{
            background: "rgba(175, 219, 245, 1)",
            padding: "20px",
            borderRadius: "10px",
            margin: "25px 50px",
            color: "#3498db",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              borderRadius: "20px",
              padding: "20px",
              marginBottom: "10px",
              fontWeight: "bold",
              background: "white",
            }}
          >
            {state.description}
            <br />
            <strong>Key Features:</strong>
            <ul>
              <li>
                Expert-led instruction: Learn from industry professionals and
                experienced educators.
              </li>
              <li>
                Flexible learning: Access courses at your own pace, anytime, and
                from anywhere.
              </li>
              <li>
                Engaging content: Interactive lessons, real-world projects, and
                assessments to reinforce learning.
              </li>
              <li>
                Comprehensive curriculum: Covering essential topics and the
                latest advancements in the field.
              </li>
              <li>
                Community support: Connect with peers, share insights, and
                collaborate on projects.
              </li>
            </ul>
          </Typography>
        </Card>
      </div>
      <br />
      <br />
      <Typography
        variant="h5"
        align="center"
        color="primary"
        sx={{ color: "#3498db", fontWeight: "bold" }}
      >
        Course Curriculum
      </Typography>
      <Card
        sx={{
          background: "rgba(175, 219, 245, 1)",
          padding: "20px",
          borderRadius: "10px",
          margin: "25px 50px",
          color: "#3498db",
        }}
      >
        <Typography sx={{ fontWeight: "bold", padding: "20px" }}>
          &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;{" "}
          {state.modules.length} MODULES &nbsp; &nbsp; &nbsp; &nbsp; 2 Hours
          -TOTAL TIME
        </Typography>
        {state.modules.map((module: Module) => (
          <Card
            key={module.id}
            sx={{
              background: "white",
              borderRadius: "20px",
              padding: "30px",
              marginBottom: "20px",
              color: "#3498db",
            }}
          >
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={8}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Module {module.id}:
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography
                  variant="body1"
                  sx={{
                    marginLeft: "auto",
                    textAlign: "justify",
                    fontWeight: "bold",
                  }}
                >
                  Duration: {module.duration}
                </Typography>
              </Grid>
            </Grid>
            <div>
              {module.id === 1 && (
                <Typography variant="body1" sx={{ color: "#3498db" }}>
                  Welcome to Module 1! In this foundational module, you'll learn
                  the core principles and essential concepts of {state.name_v}.
                  Get ready to kickstart your journey in mastering{" "}
                  {state.name_v}.
                </Typography>
              )}
              {module.id === 2 && (
                <Typography variant="body1" sx={{ color: "#3498db" }}>
                  Advanced {state.name_v} Techniques. Delve deeper into{" "}
                  {state.name_v} with advanced techniques and practical
                  examples. Enhance your expertise and discover the intricacies
                  of {state.name_v} in Module 2.
                </Typography>
              )}
              {module.id === 3 && (
                <Typography variant="body1" sx={{ color: "#3498db" }}>
                  {state.name_v} Applications in Real Life. Apply your knowledge
                  in real-world scenarios with Module 3. Gain hands-on
                  experience and learn how to effectively utilize {state.name_v}{" "}
                  in various practical applications.
                </Typography>
              )}
              {module.id === 4 && (
                <Typography variant="body1" sx={{ color: "#3498db" }}>
                  Mastering {state.name_v} Projects. Take on advanced projects
                  and challenges in Module 4. Strengthen your skills and
                  showcase your proficiency in {state.name_v} through engaging
                  and rewarding projects.
                </Typography>
              )}
              {module.id === 5 && (
                <Typography variant="body1" sx={{ color: "#3498db" }}>
                  Emerging Trends in {state.name_v}. Stay updated with the
                  latest trends and advancements in {state.name_v}. Explore
                  cutting-edge concepts and ensure you're at the forefront of{" "}
                  {state.name_v} knowledge.
                </Typography>
              )}
            </div>
          </Card>
        ))}
      </Card>
      <FreqBoughtCourses />
     
      <Dialog
        open={state.openDialog}
        onClose={() => dispatch({ type: "SET_OPEN_DIALOG", payload: false })}
      >
        <DialogTitle>Login Required</DialogTitle>
        <DialogContent dividers>
          <Typography variant="body1">
            Please login or signup to continue.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => navigate("/login")} color="primary">
            Login
          </Button>
          <Button onClick={() => navigate("/signup")} color="primary">
            Signup
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
export default CourseLandingPage;
