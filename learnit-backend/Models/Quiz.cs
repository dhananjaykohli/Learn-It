using System;
using System.Collections.Generic;

namespace learnit_backend.Models;

public partial class Quiz
{
    public int QuizQuestionId { get; set; }

    public string QuizQuestionText { get; set; } = null!;

    public int ModuleId { get; set; }

    public virtual Module? Module { get; set; } = null;

    public virtual ICollection<QuizOption>? QuizOptions { get; set; } = new List<QuizOption>();
}