import axios, { AxiosResponse } from "axios";
import QuizOption from "../../model/quiz_options";

export const GetQuizOptionsByQuestionId = async (
  quizQuestionId: number
): Promise<QuizOption[]> => {
  try {
    const response: AxiosResponse<QuizOption[]> = await axios.get(
      `http://localhost:5110/api/option/${quizQuestionId}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    } else {
      throw new Error("Unknown error");
    }
  }
};

export const GetQuizByModule_QT = async (
  quizQuestionId: number
): Promise<QuizOption[]> => {
  try {
    const response: AxiosResponse<QuizOption[]> = await axios.get(
      `http://localhost:5110/api/option/${quizQuestionId}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    } else {
      throw new Error("Unknown error");
    }
  }
};

export const CreateQuizOptions = async (
  quizOptions: QuizOption[]
): Promise<QuizOption[]> => {
  try {
    const response: AxiosResponse<QuizOption[]> = await axios.post(
      "http://localhost:5110/api/option",
      quizOptions
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    } else {
      throw new Error("Unknown error");
    }
  }
};
