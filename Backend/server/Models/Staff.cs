using System.ComponentModel.DataAnnotations;
using System;
using System.Collections.Generic;
public class Staff
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    public string Name { get; set; }

    [Required, EmailAddress]
    public string Email { get; set; }

    [Required]
    public string PasswordHash { get; set; }

    [Phone]
    public string Phone { get; set; }           // Staff phone number

    public string Role { get; set; } = "staff"; // default role

    public string Status { get; set; } = "active"; // active, busy, offline

    public double Rating { get; set; } = 0;     // average rating

    public int JobsCompleted { get; set; } = 0; // count of jobs completed

    public string Specialties { get; set; } = ""; // comma-separated services
     // 🔑 Navigation: one staff can have many jobs
    public ICollection<Job> Jobs { get; set; } = new List<Job>();
}
