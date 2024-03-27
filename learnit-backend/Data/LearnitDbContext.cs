using System;
using System.Collections.Generic;
using learnit_backend.Models;
using Microsoft.EntityFrameworkCore;

namespace learnit_backend.Data;

public partial class LearnitDbContext : DbContext
{
    public LearnitDbContext()
    {
    }

    public async Task<List<QuizInfo>> GetQuizInfoAsync()
    {
        using (var context = new LearnitDbContext())
        {
            var quizInfoList = await context.Quizzes
                .Select(q => new QuizInfo
                {
                    QuizQuestionId = q.QuizQuestionId,
                    QuizQuestionText = q.QuizQuestionText,
                    ModuleId = q.ModuleId
                })
                .ToListAsync();

            return quizInfoList;
        }
    }

    public LearnitDbContext(DbContextOptions<LearnitDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Assignment> Assignments { get; set; }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<Comment> Comments { get; set; }

    public virtual DbSet<Course> Courses { get; set; }

    public virtual DbSet<Instructor> Instructors { get; set; }

    public virtual DbSet<Lecture> Lectures { get; set; }

    public virtual DbSet<Module> Modules { get; set; }

    public virtual DbSet<Quiz> Quizzes { get; set; }

    public virtual DbSet<QuizOption> QuizOptions { get; set; }

    public virtual DbSet<Student> Students { get; set; }

    public virtual DbSet<StudentCourse> StudentCourses { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Server=.\\SQLExpress;Database=learnit;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Assignment>(entity =>
        {
            entity.ToTable("assignment");
            entity.HasKey(e => e.AQuestionId).HasName("PK__assignment__621F9B45755C35B7");
            entity.Property(e => e.AQuestionId).HasColumnName("a_question_id");
            entity.Property(e => e.ADetails).HasColumnName("a_details");
            entity.Property(e => e.CourseId).HasColumnName("course_id");
            entity.Property(e => e.ADeadline).HasColumnName("a_deadline");
            entity.HasOne(d => d.Course)
                .WithMany(p => p.Assignments)
                .HasForeignKey(d => d.CourseId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_assignment_course");
        });

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.CategoryId).HasName("PK__category__D54EE9B4CED4C560");

            entity.ToTable("category");

            entity.Property(e => e.CategoryId).HasColumnName("category_id");
            entity.Property(e => e.CategoryName)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("category_name");

            entity.HasMany(d => d.Courses).WithMany(p => p.Categories)
                .UsingEntity<Dictionary<string, object>>(
                    "CategoryCourse",
                    r => r.HasOne<Course>().WithMany()
                        .HasForeignKey("CourseId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK_category_course_course"),
                    l => l.HasOne<Category>().WithMany()
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK_category_course_category"),
                    j =>
                    {
                        j.HasKey("CategoryId", "CourseId");
                        j.ToTable("category_course");
                        j.IndexerProperty<int>("CategoryId").HasColumnName("category_id");
                        j.IndexerProperty<int>("CourseId").HasColumnName("course_id");
                    });
        });

        modelBuilder.Entity<Comment>(entity =>
        {
            entity.HasKey(e => new { e.CommentId, e.CourseId, e.StudentId });

            entity.ToTable("comments");

            entity.Property(e => e.CommentId)
                .ValueGeneratedOnAdd()
                .HasColumnName("comment_id");
            entity.Property(e => e.CourseId).HasColumnName("course_id");
            entity.Property(e => e.StudentId).HasColumnName("student_id");
            entity.Property(e => e.CommentBody)
                .IsUnicode(false)
                .HasColumnName("comment_body");

            entity.HasOne(d => d.Course).WithMany(p => p.Comments)
                .HasForeignKey(d => d.CourseId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_comments_course");

            entity.HasOne(d => d.Student).WithMany(p => p.Comments)
                .HasForeignKey(d => d.StudentId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_comments_student");
        });

        modelBuilder.Entity<Course>(entity =>
        {
            entity.HasKey(e => e.CourseId).HasName("PK__course__8F1EF7AEC41193F9");

            entity.ToTable("course");

            entity.Property(e => e.CourseId).HasColumnName("course_id");
            entity.Property(e => e.CourseDescription)
                .HasDefaultValue("")
                .HasColumnType("text")
                .HasColumnName("course_description");
            entity.Property(e => e.CourseName)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("course_name");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.ImgUrl)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("img_url");
            entity.Property(e => e.InstructorId).HasColumnName("instructor_id");
            entity.Property(e => e.Price)
                .HasColumnType("money")
                .HasColumnName("price");

            entity.HasOne(d => d.Instructor).WithMany(p => p.Courses)
                .HasForeignKey(d => d.InstructorId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_course_instructor");

            entity.HasMany(d => d.Modules).WithMany(p => p.Courses)
                .UsingEntity<Dictionary<string, object>>(
                    "CourseModule",
                    r => r.HasOne<Module>().WithMany()
                        .HasForeignKey("ModuleId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK_course_module_module"),
                    l => l.HasOne<Course>().WithMany()
                        .HasForeignKey("CourseId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK_course_module_course"),
                    j =>
                    {
                        j.HasKey("CourseId", "ModuleId");
                        j.ToTable("course_module");
                        j.IndexerProperty<int>("CourseId").HasColumnName("course_id");
                        j.IndexerProperty<int>("ModuleId").HasColumnName("module_id");
                    });
        });

        modelBuilder.Entity<Instructor>(entity =>
        {
            entity.HasKey(e => e.InstructorId).HasName("PK__instruct__A1EF56E87D138E81");

            entity.ToTable("instructor");

            entity.Property(e => e.InstructorId).HasColumnName("instructor_id");
            entity.Property(e => e.Bio)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("bio");
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.InstructorName)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("instructor_name");
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("password");
            entity.Property(e => e.Phone)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("phone");
        });

        modelBuilder.Entity<Lecture>(entity =>
        {
            entity.HasKey(e => e.LectureId).HasName("PK__lecture__797827F55DC78451");

            entity.ToTable("lecture");

            entity.Property(e => e.LectureId).HasColumnName("lecture_id");
            entity.Property(e => e.LectureDuration).HasColumnName("lecture_duration");
            entity.Property(e => e.LectureName)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("lecture_name");
            entity.Property(e => e.LectureUrl)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("lecture_url");
            entity.Property(e => e.ModuleId).HasColumnName("module_id");

            entity.HasOne(d => d.Module).WithMany(p => p.Lectures)
                .HasForeignKey(d => d.ModuleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_lecture_module");
        });

        modelBuilder.Entity<Module>(entity =>
        {
            entity.HasKey(e => e.ModuleId).HasName("PK__module__1A2D06537DBF43DF");

            entity.ToTable("module");

            entity.Property(e => e.ModuleId).HasColumnName("module_id");
            entity.Property(e => e.ModuleDuration).HasColumnName("module_duration");
            entity.Property(e => e.ModuleName)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("module_name");
        });

        modelBuilder.Entity<Quiz>(entity =>
        {
            entity.HasKey(e => e.QuizQuestionId).HasName("PK__quiz__57FBC012914E38B7");

            entity.ToTable("quiz");

            entity.Property(e => e.QuizQuestionId).HasColumnName("quiz_question_id");
            entity.Property(e => e.ModuleId).HasColumnName("module_id");
            entity.Property(e => e.QuizQuestionText)
                .IsUnicode(false)
                .HasColumnName("quiz_question_text");

            entity.HasOne(d => d.Module).WithMany(p => p.Quizzes)
                .HasForeignKey(d => d.ModuleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_quiz_module");
        });

        modelBuilder.Entity<QuizOption>(entity =>
        {
            entity.HasKey(e => e.QuizOptionId).HasName("PK__quiz_opt__E27973E98A5CD457");

            entity.ToTable("quiz_options");

            entity.Property(e => e.QuizOptionId).HasColumnName("quiz_option_id");
            entity.Property(e => e.IsCorrect).HasColumnName("is_correct");
            entity.Property(e => e.QuizOptionText)
                .IsUnicode(false)
                .HasColumnName("quiz_option_text");
            entity.Property(e => e.QuizQuestionId).HasColumnName("quiz_question_id");

            entity.HasOne(d => d.QuizQuestion).WithMany(p => p.QuizOptions)
                .HasForeignKey(d => d.QuizQuestionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_quiz_options_quiz");
        });

        modelBuilder.Entity<Student>(entity =>
        {
            entity.HasKey(e => e.StudentId).HasName("PK__student__2A33069A92EA1B0A");

            entity.ToTable("student");

            entity.Property(e => e.StudentId).HasColumnName("student_id");
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("password");
            entity.Property(e => e.Phone)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("phone");
            entity.Property(e => e.StudentName)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("student_name");
        });

        modelBuilder.Entity<StudentCourse>(entity =>
        {
            entity.HasKey(e => new { e.StudentId, e.CourseId });

            entity.ToTable("student_course");

            entity.Property(e => e.StudentId).HasColumnName("student_id");
            entity.Property(e => e.CourseId).HasColumnName("course_id");
            entity.Property(e => e.CompletionPercentage).HasColumnName("completion_percentage");
            entity.Property(e => e.PurchasedAt)
                .HasColumnType("datetime")
                .HasColumnName("purchased_at");

            entity.HasOne(d => d.Course).WithMany(p => p.StudentCourses)
                .HasForeignKey(d => d.CourseId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_student_course_course");

            entity.HasOne(d => d.Student).WithMany(p => p.StudentCourses)
                .HasForeignKey(d => d.StudentId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_student_course_student");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
