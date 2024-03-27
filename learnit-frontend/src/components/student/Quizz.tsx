import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Radio,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  RadioGroup,
  Card,
  CardContent,
  LinearProgress,
} from "@mui/material";
import Quiz from "../../model/quiz";
import { GetQuizzesByModuleId } from "../../services/api/questionService";
import Module from "../../model/module";
import axios from "axios";

const Quizz: React.FC = () => {
  const [quizQuestions, setQuizQuestions] = useState<Quiz[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userSelections, setUserSelections] = useState<{
    [key: number]: number;
  }>({});
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const { id } = useParams<{ id: string | any }>();
  const [module, setModule] = useState<Module>({
    moduleId: 0,
    moduleName: "",
  });
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchQuizQuestions = async () => {
      try {
        const response = await GetQuizzesByModuleId(Number(id));
        setQuizQuestions(response);
      } catch (error) {
        console.error("Error fetching quiz questions:", error);
      }
    };

    fetchQuizQuestions();
  }, [id]);

  const handleOptionChange = (optionId: number) => {
    setUserSelections((prevSelections) => ({
      ...prevSelections,
      [currentQuestionIndex]: optionId,
    }));
  };

  const handleSubmit = () => {
    let totalScore = 0;
    quizQuestions.forEach((question, index) => {
      const userAnswer = userSelections[index];
      const correctOption = question.quizOptions?.find(
        (option) => option.isCorrect
      );
      if (userAnswer === correctOption?.quizOptionId) {
        totalScore++;
      }
    });
    setScore(totalScore);
    setQuizFinished(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleRetakeTest = () => {
    window.location.reload();
  };
  return (
    <Box sx={{ marginBottom: 2 }}>
      <Typography
        variant="h5"
        align="center"
        sx={{ textDecoration: "underline", fontWeight: "bold" }}
      >
        {module.moduleName}
      </Typography>
      {quizQuestions.length > 0 && !quizFinished && (
        <>
          <FormControl
            component="fieldset"
            key={quizQuestions[currentQuestionIndex].quizQuestionId}
          >
            <FormLabel component="legend">
              {quizQuestions[currentQuestionIndex].quizQuestionText}
            </FormLabel>
            <FormGroup>
              <RadioGroup
                name={`question-${currentQuestionIndex}`}
                onChange={(e) => handleOptionChange(Number(e.target.value))}
              >
                {quizQuestions[currentQuestionIndex].quizOptions?.map(
                  (option, optionIndex) => (
                    <FormControlLabel
                      key={option.quizOptionId}
                      value={option.quizOptionId}
                      control={<Radio />}
                      label={option.quizOptionText}
                    />
                  )
                )}
              </RadioGroup>
            </FormGroup>
          </FormControl>
          <Box
            display="flex"
            justifyContent="space-between"
            sx={{ marginTop: 2 }}
          >
            {currentQuestionIndex === quizQuestions.length - 1 ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleNextQuestion}
              >
                Next
              </Button>
            )}
          </Box>
        </>
      )}
      {quizFinished && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100%", // Full viewport width
          }}
        >
          <Card sx={{ maxWidth: 345, margin: "auto" }}>
            <CardContent>
              <Typography variant="h6" component="div">
                Your score: {score}/{quizQuestions.length}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={(score / quizQuestions.length) * 100}
                color={
                  score / quizQuestions.length >= 0.75
                    ? "success"
                    : score / quizQuestions.length >= 0.5
                    ? "warning"
                    : "error"
                }
                sx={{ marginTop: 2, marginBottom: 2 }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleRetakeTest}
                sx={{ marginTop: 2 }}
              >
                Retake Test
              </Button>
            </CardContent>
          </Card>
        </Box>
      )}
    </Box>
  );
};

export default Quizz;
