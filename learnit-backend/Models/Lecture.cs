using System;
using System.Collections.Generic;

namespace learnit_backend.Models;

public partial class Lecture
{
    public int LectureId { get; set; }

    public string LectureName { get; set; } = null!;

    public string LectureUrl { get; set; } = null!;

    public TimeOnly LectureDuration { get; set; }

    public int ModuleId { get; set; }

    public virtual Module? Module { get; set; } = null!;
}
