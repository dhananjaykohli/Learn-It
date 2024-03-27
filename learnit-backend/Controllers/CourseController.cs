using learnit_backend.Data;
using learnit_backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace learnit_backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CourseController(LearnitDbContext context) : ControllerBase
{
    private readonly LearnitDbContext _context = context;

    [HttpGet()]
    public async Task<ActionResult<IEnumerable<Course>>> GetCourses()
    {
        var courses = await _context.Courses.ToListAsync();

        if (courses == null || !courses.Any())
        {
            return NotFound();
        }

        return Ok(courses);
    }

    [HttpPost]
    public async Task<ActionResult<Course>> CreateCourse(Course course)
    {
        _context.Courses.Add(course);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetCourses), new { id = course.CourseId }, course);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCourse(int id, Course course)
    {
        if (id != course.CourseId)
        {
            return BadRequest();
        }

        _context.Entry(course).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        Console.WriteLine(course.CourseName.ToString());
        return NoContent();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Course>> GetCourse(int id)
    {
        var course = await _context.Courses.Include(c => c.Modules).FirstOrDefaultAsync(c => c.CourseId == id);

        if (course == null)
        {
            return NotFound();
        }

        return Ok(course);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCourse(int id)
    {
        var course = await _context.Courses.FindAsync(id);
        if (course == null)
        {
            return NotFound();
        }

        _context.Courses.Remove(course);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpPut("{id}/description")]
    public async Task<IActionResult> UpdateCourseDescription(int id, [FromBody] JsonElement payload)
    {
        var course = await _context.Courses.FindAsync(id);
        if (course == null)
        {
            return NotFound();
        }

        string UDescription = payload.GetProperty("UDescription").ToString();
        course.CourseDescription = UDescription;
        _context.Entry(course).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return NoContent(); // Return a 204 No Content status code to indicate success
    }

    [HttpGet("{courseId}/top-courses")]
    public async Task<IActionResult> GetTopCourses(int courseId)
    {
        try
        {
            var studentIdsWithCourse = await _context.StudentCourses
                .Where(sc => sc.CourseId == courseId)
                .Select(sc => sc.StudentId)
                .ToListAsync();

            var topCourses = await _context.StudentCourses
                .Where(sc => studentIdsWithCourse.Contains(sc.StudentId) && sc.CourseId != courseId)
                .GroupBy(sc => sc.CourseId)
                .OrderByDescending(group => group.Count())
                .Take(3)
                .Select(group => group.Key)
                .ToListAsync();

            var courses = await _context.Courses
                .Where(c => topCourses.Contains(c.CourseId))
                .ToListAsync();

            return Ok(courses);
        }
        catch (Exception ex)
        {
            return Problem(ex.Message);
        }
    }

}
