using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Booking
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    public string Service { get; set; } = null!;

    [Required]
    public DateTime Date { get; set; }

    [Required]
    public string Time { get; set; } = null!;

    [Required]
    public string Address { get; set; } = null!;

    [Required]
    public decimal Price { get; set; }

    public string? AddOns { get; set; }
    public string? SpecialInstructions { get; set; }
    public string? Frequency { get; set; }
    public string? Cleaner { get; set; } 
    public string Status { get; set; } = "scheduled"; // default value

    // Link to User
    [Required]
    public Guid UserId { get; set; }

    [ForeignKey("UserId")]
    public AppUser User { get; set; } = null!;
}
