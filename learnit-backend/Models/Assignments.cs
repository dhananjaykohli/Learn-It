using System;
using System.Collections.Generic;

namespace learnit_backend.Models;

public partial class Assignment
{
    public int AQuestionId { get; set; }

    public string? ADetails { get; set; }

    public int CourseId { get; set; }

    public string? ADeadline { get; set; }

    public virtual Course? Course { get; set; }
}