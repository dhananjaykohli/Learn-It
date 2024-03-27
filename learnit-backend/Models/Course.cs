using System;
using System.Collections.Generic;

namespace learnit_backend.Models;

public partial class Course
{
    public int CourseId { get; set; }

    public string CourseName { get; set; } = null!;

    public string CourseDescription { get; set; } = null!;

    public string? ImgUrl { get; set; }

    public decimal Price { get; set; }

    public DateTime CreatedAt { get; set; }

    public int InstructorId { get; set; }

    public virtual ICollection<Assignment> Assignments { get; set; } = new List<Assignment>();

    public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();

    public virtual Instructor? Instructor { get; set; } = null!;

    public virtual ICollection<StudentCourse> StudentCourses { get; set; } = new List<StudentCourse>();

    public virtual ICollection<Category> Categories { get; set; } = new List<Category>();

    public virtual ICollection<Module> Modules { get; set; } = new List<Module>();
}
