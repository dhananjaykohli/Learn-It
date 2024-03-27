using Microsoft.AspNetCore.Mvc;
using learnit_backend.Data;
using learnit_backend.Models;
using Microsoft.EntityFrameworkCore;

namespace learnit_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OptionController : ControllerBase
    {
        private readonly LearnitDbContext _context;

        public OptionController(LearnitDbContext context)
        {
            _context = context;
        }

        [HttpGet("{quizQuestionId}")]
        public async Task<ActionResult<IEnumerable<QuizOption>>> GetQuizOptionsByQuestionId(int quizQuestionId)
        {
            if (quizQuestionId <= 0)
            {
                return BadRequest("Invalid QuizQuestionId");
            }

            var quizOptions = await _context.QuizOptions
                .Where(qo => qo.QuizQuestionId == quizQuestionId)
                .Select(qo => new QuizOption
                {
                    QuizOptionId = qo.QuizOptionId,
                    QuizQuestionId = qo.QuizQuestionId,
                    QuizOptionText = qo.QuizOptionText,
                    IsCorrect = qo.IsCorrect,
                    QuizQuestion = null // Assuming you don't want to include the QuizQuestion in this response
                })
                .ToListAsync();

            if (quizOptions == null || !quizOptions.Any())
            {
                return NotFound("No quiz options found for the given QuizQuestionId");
            }

            return Ok(quizOptions);
        }

        [HttpPost]
        public async Task<ActionResult<IEnumerable<QuizOption>>> CreateQuizOptions(List<QuizOption> quizOptions)
        {
            if (quizOptions == null || !quizOptions.Any())
            {
                return BadRequest("No QuizOptions provided.");
            }

            // Assuming you have some validation logic here
            // For example, checking if the QuizQuestionId exists in the database for each option

            _context.QuizOptions.AddRange(quizOptions);
            await _context.SaveChangesAsync();

            return Ok(quizOptions);
        }


    }
}