using System;
using System.Collections.Generic;

namespace learnit_backend.Models;

public partial class StudentCourse
{
    public int StudentId { get; set; }

    public int CourseId { get; set; }

    public int? CompletionPercentage { get; set; }

    public DateTime PurchasedAt { get; set; }

    public virtual Course Course { get; set; } = null!;

    public virtual Student Student { get; set; } = null!;
}
