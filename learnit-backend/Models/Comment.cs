using System;
using System.Collections.Generic;

namespace learnit_backend.Models;

public partial class Comment
{
    public int CommentId { get; set; }

    public string CommentBody { get; set; } = null!;

    public int CourseId { get; set; }

    public int StudentId { get; set; }

    public virtual Course? Course { get; set; } = null;

    public virtual Student? Student { get; set; } = null;
}
