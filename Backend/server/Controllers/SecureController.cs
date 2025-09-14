
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class SecureController : ControllerBase
{
    [HttpGet("public")]
    public IActionResult Public() => Ok(new { message = "This is a public endpoint" });

    [Authorize]
    [HttpGet("protected")]
    public IActionResult Protected() => Ok(new { message = "You are authenticated" });

    [Authorize(Roles = "Admin")]
    [HttpGet("admin")]
    public IActionResult AdminOnly() => Ok(new { message = "You are an admin" });
}