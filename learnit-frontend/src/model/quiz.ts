import Module from "module";
import QuizOption from "./quiz_options";

export default interface Quiz {
  quizQuestionId?: number;
  quizQuestionText: string;
  moduleId: number;
  module?: Module[];
  quizOptions?: QuizOption[];
}
