namespace learnit_backend.Models
{
    public class QuizInfo
    {
        public int QuizQuestionId { get; set; }
        public required string QuizQuestionText { get; set; }
        public int ModuleId { get; set; }

    }
}