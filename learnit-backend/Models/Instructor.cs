using System;
using System.Collections.Generic;

namespace learnit_backend.Models;

public partial class Instructor
{
    public int InstructorId { get; set; }

    public string InstructorName { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string? Phone { get; set; }

    public string Password { get; set; } = null!;

    public string? Bio { get; set; }

    public virtual ICollection<Course> Courses { get; set; } = new List<Course>();
}
