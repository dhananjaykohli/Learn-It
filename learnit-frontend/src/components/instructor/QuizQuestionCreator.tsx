import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { SelectChangeEvent } from "@mui/material";
import { AddQuizQuestion } from "../../services/api/questionService";
import { CreateQuizOptions } from "../../services/api/optionService";
import Module from "../../model/module";
import axios from "axios";

const QuizQuestionCreator: React.FC = () => {
  const [question, setQuestion] = useState("");
  const [quizOptions, setQuizOptions] = useState<
    { quizOptionText: string; isCorrect: boolean }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  //  const { id } = useParams(); // Extracting moduleId from the URL
  const { id } = useParams<{ id: string | any }>(); // Extracting moduleId from the URL
  const [module, setModule] = useState<Module>({
    moduleId: 0,
    moduleName: "", // Assuming you're converting TimeOnly to a string format for simplicity
  });
  const navigate = useNavigate();

  const handleIsCorrectChange = (
    index: number,
    event: SelectChangeEvent<string>
  ) => {
    const newValue = event.target.value === "true";
    setQuizOptions(
      quizOptions.map((option, idx) =>
        idx === index ? { ...option, isCorrect: newValue } : option
      )
    );
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const quizInfo = {
        quizQuestionText: question,
        moduleId: Number(id), // Using the id from the URL as the moduleId
      };
      const response = await AddQuizQuestion(quizInfo);
      const quizQuestionId = response.quizQuestionId;

      const quizOptionsToSend = quizOptions.map((option, index) => ({
        quizOptionId: 0, // Assuming this is auto-generated or not required
        quizQuestionId: quizQuestionId,
        ...option,
      }));
      await CreateQuizOptions(quizOptionsToSend);
      setSuccess(true);
    } catch (error) {
      console.error("Failed to add quiz question and options:", error);
    }
    setLoading(false);
  };

  const addQuizOption = () => {
    if (quizOptions.length < 3) {
      setQuizOptions([
        ...quizOptions,
        { quizOptionText: "", isCorrect: false },
      ]);
    }
  };

  //  const handleIsCorrectChange = (index: number, event: React.ChangeEvent<{ value: unknown }>) => {
  //     const newValue = event.target.value === 'true';
  //     setQuizOptions(quizOptions.map((option, idx) => idx === index ? { ...option, isCorrect: newValue } : option));
  //  };

  useEffect(() => {
    const fetchModule = async () => {
      try {
        const response = await axios.get<Module>(
          `http://localhost:5110/api/module/${id}`
        );
        console.log(response);
        setModule(response.data);
      } catch (error) {
        console.error("Error fetching module:", error);
      }
    };

    fetchModule();
  }, [id]);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography
        variant="h5"
        align="center"
        sx={{ textDecoration: "underline", fontWeight: "bold" }}
      >
        {module.moduleName}
      </Typography>
      <br />
      <Typography variant="h6" gutterBottom>
        Add Quiz Question and Options
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Question"
          variant="outlined"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        {quizOptions.map((option, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <div style={{ position: "relative", width: "100%" }}>
              <TextField
                fullWidth
                margin="normal"
                label="Option Text"
                variant="outlined"
                value={option.quizOptionText}
                onChange={(e) =>
                  setQuizOptions(
                    quizOptions.map((opt, idx) =>
                      idx === index
                        ? { ...opt, quizOptionText: e.target.value }
                        : opt
                    )
                  )
                }
                InputProps={{
                  style: { paddingRight: "40px" }, // Add padding to accommodate dropdown
                }}
              />
              <Select
                sx={{
                  position: "absolute",
                  right: "10px",
                  top: "55%",
                  transform: "translateY(-50%)",
                  height: "35px",
                  width: "100px",
                  borderRadius: "4px",
                  backgroundColor: "#f0f0f0",
                  border: "1px solid #ccc",
                }}
                label="Is Correct"
                variant="outlined"
                value={option.isCorrect.toString()}
                onChange={(event) => handleIsCorrectChange(index, event)}
              >
                <MenuItem value="true">True</MenuItem>
                <MenuItem value="false">False</MenuItem>
              </Select>
            </div>
          </div>
        ))}

        {quizOptions.length < 3 && (
          <Button
            type="button"
            variant="contained"
            color="primary"
            onClick={addQuizOption}
            sx={{ marginTop: 2 }}
          >
            Add Option
          </Button>
        )}
        <br />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          sx={{ marginTop: 2 }}
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </form>
      {success && (
        <Typography variant="body1" color="success.main" gutterBottom>
          Question added successfully!
        </Typography>
      )}
    </Box>
  );
};

export default QuizQuestionCreator;
