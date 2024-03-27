using Microsoft.AspNetCore.Mvc;
using learnit_backend.Data;
using learnit_backend.Models;
using Microsoft.EntityFrameworkCore;

namespace learnit_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionController : ControllerBase
    {
        private readonly LearnitDbContext _context;

        public QuestionController(LearnitDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetQuizInfo()
        {
            var quizInfo = await _context.Quizzes
                .Select(q => new QuizInfo
                {
                    QuizQuestionId = q.QuizQuestionId,
                    QuizQuestionText = q.QuizQuestionText,
                    ModuleId = q.ModuleId
                })
                .ToListAsync();

            return Ok(quizInfo);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<QuizInfo>> GetQuizById(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid ID");
            }

            var quiz = await _context.Quizzes
                .Where(q => q.QuizQuestionId == id)
                .Select(q => new QuizInfo
                {
                    QuizQuestionId = q.QuizQuestionId,
                    QuizQuestionText = q.QuizQuestionText,
                    ModuleId = q.ModuleId
                })
                .FirstOrDefaultAsync();

            if (quiz == null)
            {
                return NotFound("Quiz not found");
            }

            return Ok(quiz);
        }

        [HttpPost]
        public async Task<ActionResult<Quiz>> CreateQuestion(Quiz quiz)
        {
            _context.Quizzes.Add(quiz);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetQuizInfo), new { id = quiz.QuizQuestionId }, quiz);
        }


    }
}