using System.Text.Json;
using learnit_backend.Data;
using learnit_backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace learnit_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly LearnitDbContext _context;

         public StudentController(LearnitDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<Student>> CreateStudent(Student student)
        {
            _context.Students.Add(student);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetStudent), new { id = student.StudentId }, student);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStudent(int id, Student student)
        {
            if (id != student.StudentId)
            {
                return BadRequest();
            }

            _context.Entry(student).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            Console.WriteLine(student.StudentName.ToString());
            return NoContent();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Student>> GetStudent(int id)
        {
            var student = await _context.Students.FindAsync(id);

            if (student == null)
            {
                return NotFound();
            }

            return student;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Student>>> GetStudents()
        {
            var students = await _context.Students.ToListAsync();

            if (students == null || !students.Any())
            {
                return NotFound();
            }

            return students;
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudent(int id)
        {
            var student = await _context.Students.FindAsync(id);
            if (student == null)
            {
                return NotFound();
            }

            _context.Students.Remove(student);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("{studentId}/courses")]
        public async Task<IActionResult> GetStudentCourses(int studentId)
        {
            var student = await _context.Students.FindAsync(studentId);

            if (student == null)
            {
                return NotFound("Student not found.");
            }

            var studentCourses = await _context.StudentCourses
                .Where(sc => sc.StudentId == studentId)
                .Select(sc => new
                {
                    sc.CourseId,
                    sc.Course.CourseName,
                    sc.Course.CourseDescription,
                    sc.Course.ImgUrl,
                    sc.Course.Price,
                    sc.Course.CreatedAt,
                    Progress = sc.CompletionPercentage
                })
                .ToListAsync();

            return Ok(studentCourses);
        }

        [HttpPost("auth")]
        public async Task<IActionResult> Auth([FromBody] JsonElement payload)
        {
            var students = await _context.Students.ToListAsync();
            try
            {
                string email = payload.GetProperty("email").ToString();
                string password = payload.GetProperty("password").ToString();
                foreach (var student in students)
                {
                    if (student.Email == email)
                    {
                        if (student.Password == password)
                        {
                            return Ok(new { id = student.StudentId });
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
    }
}