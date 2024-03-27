using System;
using System.Collections.Generic;

namespace learnit_backend.Models;

public partial class Student
{
    public int StudentId { get; set; }

    public string StudentName { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string? Phone { get; set; }

    public string Password { get; set; } = null!;

    public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();

    public virtual ICollection<StudentCourse> StudentCourses { get; set; } = new List<StudentCourse>();
}
