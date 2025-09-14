
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
        var user = await _users.CreateAsync(dto.Email, dto.Password, role);
        return Ok(new { user.Id, user.Email, user.Role });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto dto)
    {
        var user = await _users.GetByEmailAsync(dto.Email);
        if (user == null) return Unauthorized("Invalid credentials");
        var ok = await _users.CheckPasswordAsync(user, dto.Password);
        if (!ok) return Unauthorized("Invalid credentials");
        var token = TokenHelper.CreateToken(user, _config["Jwt:Issuer"] ?? "MyApi", _config["Jwt:Key"] ?? "ThisIsADevSigningKey-ChangeMe");
        return Ok(new { token });
    }
}

public record RegisterDto(string Email, string Password, string? Role);
public record LoginDto(string Email, string Password);
