import React, { useState, useEffect, ChangeEvent } from "react";
import {
  TextField,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  InputLabel,
} from "@mui/material";
import { addAssignment } from "../../services/api/assignmentService";
import { useLocation, useNavigate } from "react-router-dom";

const AddAssignmentForm: React.FC = () => {
  const [assignmentDetails, setAssignmentDetails] = useState("");
  const [deadline, setDeadline] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const courseId = location.state.courseId;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    handleOpenDialog();
  }, []);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (assignmentDetails.trim() === "") {
      return;
    }
    const requestData = {
      aDetails: assignmentDetails,
      courseId: courseId,
      aDeadline: deadline,
    };

    console.log("Request Body:", requestData);

    try {
      await addAssignment(requestData);
      alert("Assignment added successfully");
      navigate(-1);
    } catch (error) {
      console.error("Error adding assignment:", error);
    }

    handleCloseDialog();
  };

  const handleDeadlineChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDeadline(event.target.value);
  };

  return (
    <>
      <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>Add Assignment</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <InputLabel htmlFor="details">Assignment Details *</InputLabel>
                <TextField
                  fullWidth
                  id="details"
                  variant="outlined"
                  multiline
                  rows={4}
                  value={assignmentDetails}
                  onChange={(e) => setAssignmentDetails(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel htmlFor="deadline">Deadline</InputLabel>
                <TextField
                  fullWidth
                  id="deadline"
                  variant="outlined"
                  type="string"
                  value={deadline}
                  onChange={handleDeadlineChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit">
                  Add Assignment
                </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddAssignmentForm;
