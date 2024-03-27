using System;
using System.Collections.Generic;

namespace learnit_backend.Models;

public partial class Category
{
    public int CategoryId { get; set; }

    public string CategoryName { get; set; } = null!;

    public virtual ICollection<Course> Courses { get; set; } = new List<Course>();
}
