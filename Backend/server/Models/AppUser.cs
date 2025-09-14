using System.ComponentModel.DataAnnotations;

public class AppUser
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();
    [Required]
    public string Email { get; set; } = null!;
    [Required]
    public string PasswordHash { get; set; } = null!; // for demo: use BCrypt
    public string Role { get; set; } = "User";
}
