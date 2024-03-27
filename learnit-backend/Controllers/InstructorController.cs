using System.Text.Json;
using learnit_backend.Data;
using learnit_backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace Learnit_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InstructorController(LearnitDbContext context) : ControllerBase
    {
        private readonly LearnitDbContext _context = context;

        [HttpPost]
        public async Task<ActionResult<Instructor>> CreateInstructor(Instructor instructor)
        {
            _context.Instructors.Add(instructor);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetInstructors), new { id = instructor.InstructorId }, instructor);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateInstructor(int id, Instructor instructor)
        {
            if (id != instructor.InstructorId)
            {
                return BadRequest();
            }

            _context.Entry(instructor).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInstructor(int id)
        {
            var instructor = await _context.Instructors.FindAsync(id);
            if (instructor == null)
            {
                return NotFound();
            }

            _context.Instructors.Remove(instructor);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Instructor>> GetInstructor(int id)
        {
            var instructor = await _context.Instructors.FindAsync(id);

            if (instructor == null)
            {
                return NotFound();
            }

            return instructor;
        }

        [Authorize]
        [HttpGet("protected")]
        public async Task<ActionResult<IEnumerable<Instructor>>> GetProtectedInstructors()
        {
            var instructors = await _context.Instructors.ToListAsync();

            if (instructors == null || instructors.Count == 0)
            {
                return NotFound();
            }

            return instructors;
        }


        [HttpGet()]
        public async Task<ActionResult<IEnumerable<Instructor>>> GetInstructors()
        {
            var instructors = await _context.Instructors.ToListAsync();

            if (instructors == null || instructors.Count == 0)
            {
                return NotFound();
            }

            return instructors;
        }

        [HttpPost("auth")]
        public async Task<IActionResult> Auth([FromBody] JsonElement payload)
        {
            var instructors = await _context.Instructors.ToListAsync();
            try
            {
                string email = payload.GetProperty("email").ToString();
                string password = payload.GetProperty("password").ToString();
                foreach (var instructor in instructors)
                {
                    if (instructor.Email == email)
                    {
                        if (instructor.Password == password)
                        {
                            return Ok(new { id = instructor.InstructorId });
                        }
                        else
                        {
                            return Unauthorized(new { message = "Invalid password" });
                        }
                    }
                }
                return NotFound(new { message = "The user with the email not found" });
            }
            catch (Exception)
            {
                return BadRequest(new { message = "Email or password not provided." });
            }


        }

        [HttpGet("{instructorId}/courses")]
        public async Task<IActionResult> GetStudentCourses(int instructorId)
        {
            var student = await _context.Students.FindAsync(instructorId);

            if (student == null)
            {
                return NotFound("There are no courses made by you.");
            }

            var studentCourses = await _context.Courses
                .Where(c => c.InstructorId == instructorId)
                .Select(c => new
                {
                    c.CourseId,
                    c.CourseName,
                    c.CourseDescription,
                    c.ImgUrl,
                    c.Price,
                    c.CreatedAt,
                })
                .ToListAsync();

            return Ok(studentCourses);
        }
    }
}
