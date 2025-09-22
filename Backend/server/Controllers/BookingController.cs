using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class BookingController : ControllerBase
{
    private readonly IBookingService _bookingService;

    public BookingController(IBookingService bookingService)
    {
        _bookingService = bookingService;
    }

  private Guid GetUserId()
{
    var userIdClaim = User.FindFirst(ClaimTypes.Sid)?.Value;
    Console.WriteLine($"JWT Claim userId: {userIdClaim}");
    return Guid.TryParse(userIdClaim, out var id) ? id : Guid.Empty;
}


    [HttpPost]
    public async Task<IActionResult> Create([FromBody] BookingDto dto)
    {
        var userId = GetUserId();
        if (userId == Guid.Empty) return Unauthorized();

        var booking = await _bookingService.CreateAsync(dto, userId);
        var response = new BookingResponseDto
        {
            Id = booking.Id,
            Service = booking.Service,
            Date = booking.Date,
            Time = booking.Time,
            Address = booking.Address,
            Price = booking.Price,
            AddOns = booking.AddOns,
            SpecialInstructions = booking.SpecialInstructions,
            Frequency = booking.Frequency,
            User = new UserDto
            {
                Id = booking.User.Id,
                Name = booking.User.Name,
                Email = booking.User.Email,
                Role = booking.User.Role
            }
        };
        return Ok(response);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
         Console.WriteLine($"JWT Claim userId: ");
        var userId = GetUserId();
        Console.WriteLine($"JWT Claim userId: {userId}");
        if (userId == Guid.Empty) return Unauthorized();

        var bookings = await _bookingService.GetAllAsync(userId);
        return Ok(bookings);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(Guid id)
    {
        var userId = GetUserId();
        if (userId == Guid.Empty) return Unauthorized();

        var booking = await _bookingService.GetByIdAsync(id, userId);
        if (booking == null) return NotFound();
        return Ok(booking);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] BookingDto dto)
    {
        var userId = GetUserId();
        if (userId == Guid.Empty) return Unauthorized();

        var updated = await _bookingService.UpdateAsync(id, dto, userId);
        if (updated == null) return NotFound();
        return Ok(updated);
    }

[HttpPut("{id}/cancel")]
public async Task<IActionResult> Cancel(Guid id)
{
    var userId = GetUserId();
    if (userId == Guid.Empty) return Unauthorized();

    var cancelled = await _bookingService.CancelBookingAsync(id, userId);
    if (cancelled == null) return NotFound();

    return Ok(cancelled);
}



    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var userId = GetUserId();
        if (userId == Guid.Empty) return Unauthorized();

        var deleted = await _bookingService.DeleteAsync(id, userId);
        if (!deleted) return NotFound();
        return NoContent();
    }
}
public class BookingResponseDto
{
    public Guid Id { get; set; }
    public string Service { get; set; } = null!;
    public DateTime Date { get; set; }
    public string Time { get; set; } = null!;
    public string Address { get; set; } = null!;
    public decimal Price { get; set; }
    public string[]? AddOns { get; set; }
    public string? SpecialInstructions { get; set; }
    public string? Frequency { get; set; }
      public string? Cleaner { get; set; }
    public string Status { get; set; } = "";
    public UserDto User { get; set; } = null!;
}

public class UserDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Role { get; set; } = null!;
}
