import Quiz from "./quiz";

export default interface QuizOption {
  quizOptionId?: number;
  quizQuestionId?: number;
  quizOptionText: string;
  isCorrect: boolean;
  quizQuestion?: Quiz | null;
}
