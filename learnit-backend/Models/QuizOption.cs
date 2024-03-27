using System;
using System.Collections.Generic;

namespace learnit_backend.Models;

public partial class QuizOption
{
    public int QuizOptionId { get; set; }

    public int QuizQuestionId { get; set; }

    public string? QuizOptionText { get; set; }

    public bool? IsCorrect { get; set; }

    public virtual Quiz? QuizQuestion { get; set; } = null!;
}
