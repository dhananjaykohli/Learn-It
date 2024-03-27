import React from "react";
import { Box, Typography, Button, Grid, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontSize: { xs: "2rem", md: "2.2rem" } }}
          >
            Welcome to Learnit!
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            sx={{ fontSize: { xs: "1rem", md: "1.2rem" } }}
          >
            Explore our diverse range of courses tailored to enhance your
            learning experience. From coding to cooking, history to holistic
            wellness, there's something for everyone. Our expert instructors are
            here to guide you every step of the way. Join our vibrant community
            and start your learning adventure today!
          </Typography>
          {/* Feature buttons */}
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/courses"
            sx={{ marginTop: 2 }}
          >
            Browse All Courses
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <CardMedia
            component="img"
            height="100%"
            // image="https://source.unsplash.com/random"
            image="https://logodix.com/logo/2149417.png"
            alt="Course Image"
            sx={{
              height: { xs: "50vh", md: "50vh" },
              objectFit: "cover",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;
