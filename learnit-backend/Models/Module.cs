using System;
using System.Collections.Generic;

namespace learnit_backend.Models;

public partial class Module
{
    public int ModuleId { get; set; }

    public string ModuleName { get; set; } = null!;

    public TimeOnly ModuleDuration { get; set; }

    public virtual ICollection<Lecture> Lectures { get; set; } = new List<Lecture>();

    public virtual ICollection<Quiz> Quizzes { get; set; } = new List<Quiz>();

    public virtual ICollection<Course> Courses { get; set; } = new List<Course>();
}
