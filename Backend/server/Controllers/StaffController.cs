using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class StaffController : ControllerBase
{
    private readonly IStaffService _staffService;

    public StaffController(IStaffService staffService)
    {
        _staffService = staffService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] StaffRegisterDto dto)
    {
        try
        {
            var result = await _staffService.RegisterAsync(dto);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto dto)
    {
        try
        {
            var result = await _staffService.LoginAsync(dto.Email, dto.Password);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return Unauthorized(ex.Message);
        }
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var result = await _staffService.GetAllAsync();
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        try
        {
            var result = await _staffService.GetByIdAsync(id);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return NotFound(ex.Message);
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] StaffRegisterDto dto)
    {
        try
        {
            var result = await _staffService.UpdateAsync(id, dto);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var success = await _staffService.DeleteAsync(id);
        if (!success) return NotFound();
        return NoContent();
    }
}

