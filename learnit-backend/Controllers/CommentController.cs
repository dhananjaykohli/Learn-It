using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using learnit_backend.Data;
using learnit_backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Learnit_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly LearnitDbContext _context;

        public CommentController(LearnitDbContext context)
        {
            _context = context;
        }

        // GET: api/Comment
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Comment>>> GetComments()
        {
            return await _context.Comments.ToListAsync();
        }

        // GET: api/Comment/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Comment>> GetComment(int id)
        {
            var comment = await _context.Comments.FindAsync(id);

            if (comment == null)
            {
                return NotFound();
            }

            return comment;
        }

        // POST: api/Comment
        [HttpPost]
        public async Task<ActionResult<Comment>> PostComment(Comment comment)
        {
            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetComment), new { id = comment.CommentId }, comment);
        }

        // [HttpPost]
        // public async Task<ActionResult<Comment>> PostComment(Comment comment)
        // {
        //     if (!ModelState.IsValid)
        //     {
        //         return BadRequest(ModelState);
        //     }

        //     _context.Comments.Add(comment);
        //     await _context.SaveChangesAsync();

        //     return CreatedAtAction(nameof(GetComment), new { id = comment.CommentId }, comment);
        // }

        // DELETE: api/Comment/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComment(int id)
        {
            var comment = await _context.Comments.FindAsync(id);
            if (comment == null)
            {
                return NotFound();
            }

            _context.Comments.Remove(comment);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        [HttpGet("course/{courseId}")]
        public async Task<ActionResult<IEnumerable<CommentWithStudentName>>> GetCommentsByCourseId(int courseId)
        {
            var commentsWithStudents = await _context.Comments
                .Where(c => c.CourseId == courseId)
                .Join(
                    _context.Students,
                    comment => comment.StudentId,
                    student => student.StudentId,
                    (comment, student) => new CommentWithStudentName
                    {
                        CommentId = comment.CommentId,
                        CommentBody = comment.CommentBody,
                        CourseId = comment.CourseId,
                        StudentName = student.StudentName // Assuming 'StudentName' is the property in Students for student name
                    })
                .ToListAsync();

            if (commentsWithStudents == null || !commentsWithStudents.Any())
            {
                return NotFound();
            }

            return commentsWithStudents;
        }



        // put comments based on course id
        [HttpPost("course/{courseId}")]
        public async Task<ActionResult<Comment>> PostComment(int courseId, Comment comment)
        {
            if (courseId != comment.CourseId)
            {
                return BadRequest("The course ID in the URL must match the course ID in the comment.");
            }

            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetComment), new { id = comment.CommentId }, comment);
        }

    }

    public class CommentWithStudentName
    {
        public int CommentId { get; set; }
        public string? CommentBody { get; set; } // Assuming 'CommentBody' property in Comment class
        public int CourseId { get; set; }
        public string? StudentName { get; set; }
    }
}