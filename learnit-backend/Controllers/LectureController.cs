using learnit_backend.Data;
using learnit_backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace learnit_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LectureController : ControllerBase
    {
        private readonly LearnitDbContext _context;

        public LectureController(LearnitDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Lecture>>> GetLectures()
        {
            var lectures = await _context.Lectures.ToListAsync();

            if (lectures == null || lectures.Count == 0)
            {
                return NotFound();
            }

            return Ok(lectures);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Lecture>> GetLectureById(int id)
        {
            var lecture = await _context.Lectures.FindAsync(id);

            if (lecture == null)
            {
                return NotFound();
            }

            return Ok(lecture);
        }

        [HttpPost]
        public async Task<ActionResult<Lecture>> CreateLecture(Lecture lecture)
        {
            _context.Lectures.Add(lecture);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetLectureById), new { id = lecture.LectureId }, lecture);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateLecture(int id, Lecture lecture)
        {
            if (id != lecture.LectureId)
            {
                return BadRequest();
            }

            _context.Entry(lecture).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LectureExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Lecture>> DeleteLecture(int id)
        {
            var lecture = await _context.Lectures.FindAsync(id);
            if (lecture == null)
            {
                return NotFound(); // Return 404 Not Found if lecture with given id is not found
            }

            _context.Lectures.Remove(lecture);
            await _context.SaveChangesAsync(); // Save changes to the database

            return Ok(lecture); // Return the deleted lecture
        }

        [HttpGet("module/{moduleId}")]
        public async Task<ActionResult<IEnumerable<Lecture>>> GetLecturesByModuleId(int moduleId)
        {
            var lectures = await _context.Lectures
                .Where(l => l.ModuleId == moduleId)
                .ToListAsync();

            if (lectures == null || lectures.Count == 0)
            {
                return NotFound();
            }

            return Ok(lectures);
        }

        private bool LectureExists(int id)
        {
            return _context.Lectures.Any(e => e.LectureId == id);
        }
    }
}
