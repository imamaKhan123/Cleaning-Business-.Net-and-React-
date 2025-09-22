using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

public class AppUser
{
    [Key]
    [Column(TypeName = "char(36)")] // store Guid as fixed-length CHAR
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Email { get; set; } = null!;
    [Required]
    public string Name { get; set; } = null!;
    [Required]
    public string PasswordHash { get; set; } = null!; // for demo: use BCrypt
    public string Role { get; set; } = "User";
     [JsonIgnore] 
     public List<Booking> Bookings { get; set; } = new List<Booking>();

}
