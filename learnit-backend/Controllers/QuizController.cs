using Microsoft.AspNetCore.Mvc;
using learnit_backend.Models;
using Microsoft.EntityFrameworkCore;
using learnit_backend.Data;

namespace learnit_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QuizController : ControllerBase
    {
        private readonly LearnitDbContext _context;

        public QuizController(LearnitDbContext context)
        {
            _context = context;
        }

        // GET: api/Quiz/ModuleId
        [HttpGet("{moduleId}")]
        public async Task<ActionResult<IEnumerable<Quiz>>> GetQuizzesByModuleId(int moduleId)
        {
            var quizzes = await _context.Quizzes
                .Include(q => q.QuizOptions)
                .Where(q => q.ModuleId == moduleId)
                .ToListAsync();

            if (!quizzes.Any())
            {
                return NotFound();
            }

            return quizzes;
        }

    }
}