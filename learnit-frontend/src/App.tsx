import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Button,
  Tooltip,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import LibraryBooks from "@mui/icons-material/LibraryBooks";
import { Add } from "@mui/icons-material";
import { Bookmark } from "@mui/icons-material";
import { AccountCircle } from "@mui/icons-material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "./components/Footer";
import { Link } from "react-router-dom";
import useLocalStorage from "./services/hooks/useLocalStorage";

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { getItem } = useLocalStorage("user");
  const renderInstructorProfile = location.pathname.startsWith("/instructor/");
  const renderStudentProfile = location.pathname.startsWith("/student/");
  return (
    <>
      <header>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="fixed">
            <Toolbar>
              <IconButton
                component={Link}
                to={
                  getItem()
                    ? getItem().role === "student"
                      ? "/student/home"
                      : "/instructor/home"
                    : "/"
                }
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <SchoolIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Learnit
              </Typography>
              {location.pathname === "/" ? (
                <Button color="inherit" onClick={() => navigate("/login")}>
                  Login
                </Button>
              ) : null}
              {location.pathname === "/" ? (
                <Button color="inherit" onClick={() => navigate("/signup")}>
                  Sign up
                </Button>
              ) : null}
              {renderInstructorProfile && (
                <>
                  <Tooltip title="Library">
                    <IconButton
                      size="large"
                      color="inherit"
                      component={Link}
                      to="/courses"
                      sx={{ marginLeft: "auto" }}
                    >
                      <LibraryBooks />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Add Course">
                    <IconButton
                      size="large"
                      color="inherit"
                      component={Link}
                      to="/instructor/coursebuilder"
                    >
                      <Add /> {/* Assuming you have an AddIcon imported */}
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="My Courses">
                    <IconButton
                      size="large"
                      color="inherit"
                      component={Link}
                      to="/instructor/courses"
                    >
                      <Bookmark /> {/* Using MyCourses icon */}
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Profile">
                    <IconButton
                      size="large"
                      color="inherit"
                      component={Link}
                      to={`/instructor/${getItem().id}/profile`}
                    >
                      <AccountCircle />
                    </IconButton>
                  </Tooltip>
                </>
              )}
              {renderStudentProfile && (
                <>
                  <Box sx={{ flexGrow: 1 }} />
                  <Box sx={{ display: "flex", alignItems: "center" }}></Box>
                  <Tooltip title="Library">
                    <IconButton
                      size="large"
                      color="inherit"
                      component={Link}
                      to="/courses"
                    >
                      <LibraryBooks />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="My Courses">
                    <IconButton
                      size="large"
                      color="inherit"
                      component={Link}
                      to="/student/courses"
                    >
                      <Bookmark /> {/* Using MyCourses icon */}
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Profile">
                    <IconButton
                      size="large"
                      color="inherit"
                      component={Link}
                      to={`/student/${getItem().id}/profile`}
                    >
                      <AccountCircle />
                    </IconButton>
                  </Tooltip>
                </>
              )}
            </Toolbar>
          </AppBar>
        </Box>
      </header>
      <main>
        <Box
          sx={{
            marginTop: 10,
            marginLeft: { xs: 1, sm: 2, md: 10, lg: 10 },
            marginRight: { xs: 1, sm: 2, md: 10, lg: 10 },
          }}
        >
          <Outlet />
        </Box>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default App;
