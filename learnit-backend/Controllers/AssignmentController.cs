using learnit_backend.Data;
using learnit_backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Learnit_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssignmentController : ControllerBase
    {
        private readonly LearnitDbContext _context;

        public AssignmentController(LearnitDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<Assignment>> Post(Assignment assignment)
        {
            _context.Assignments.Add(assignment);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAssignment), new { id = assignment.AQuestionId}, assignment);
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Assignment>>> GetAssignment()
        {
            var assignment = await _context.Assignments.ToListAsync();
            if (assignment == null || assignment.Count == 0)
            {
                return NotFound();
            }

            return assignment;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Assignment>> GetAssignment(int id)
        {
            var assignment = await _context.Assignments.FindAsync(id);
            if (assignment == null)
            {
                return NotFound();
            }

            return assignment;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAssignment(int id, Assignment assignment)
        {
            if (id != assignment.AQuestionId)
            {
                return BadRequest();
            }

            _context.Entry(assignment).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAssignment(int id)
        {
            var assignment = await _context.Assignments.FindAsync(id);
            if (assignment == null)
            {
                return NotFound();
            }

            _context.Assignments.Remove(assignment);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("course/{courseId}")]
        public async Task<ActionResult<IEnumerable<Assignment>>> GetAssignmentsByCourseId(int courseId)
        {
            var assignments = await _context.Assignments
                                            .Where(a => a.CourseId == courseId)
                                            .ToListAsync();
 
            if (assignments == null || assignments.Count == 0)
            {
                return NotFound();
            }
 
            return Ok(assignments);
        }
    }
}