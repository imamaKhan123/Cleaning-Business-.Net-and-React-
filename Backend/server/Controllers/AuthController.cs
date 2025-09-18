
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IUserService _users;
    private readonly IConfiguration _config;

    public AuthController(IUserService users, IConfiguration config)
    {
        _users = users;
        _config = config;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDto dto)
    {
        var existing = await _users.GetByEmailAsync(dto.Email);
        if (existing != null) return BadRequest("User already exists");
        var role = string.IsNullOrWhiteSpace(dto.Role) ? "User" : dto.Role;
        var user = await _users.CreateAsync(dto.Email, dto.Password, dto.Name,role);
        return Ok(new { user.Id,user.Name, user.Email, user.Role });
    }

  [HttpPost("login")]
public async Task<IActionResult> Login(LoginDto dto)
{
    var user = await _users.GetByEmailAsync(dto.Email);
    if (user == null)
        return Unauthorized(new { message = "Invalid credentials" });

    var ok = await _users.CheckPasswordAsync(user, dto.Password);
    if (!ok)
        return Unauthorized(new { message = "Invalid credentials" });

    // Ensure your JWT key is at least 32 bytes for HS256
    var jwtKey = _config["Jwt:Key"] ?? "ThisIsADevSigningKey-ChangeMe-AddMoreChars!";
    if (jwtKey.Length < 32)
        jwtKey = jwtKey.PadRight(32, 'X');

    var token = TokenHelper.CreateToken(user, _config["Jwt:Issuer"] ?? "MyApi", jwtKey);

    // Return token + user info (without PasswordHash)
    return Ok(new
    {
        token,
        user = new
        {
            id = user.Id,
            name = user.Name,
            email = user.Email,
            role = user.Role
        }
    });
}

}

public record RegisterDto(string Email, string Password, string Name, string? Role);
public record LoginDto(string Email, string Password);
public record BookingDto(
    string Service,
    DateTime Date,
    string Time,
    string Address,
    decimal Price,
    string? AddOns,
    string? SpecialInstructions,
    string? Frequency,
      string? Cleaner ,
    string? Status 

);
