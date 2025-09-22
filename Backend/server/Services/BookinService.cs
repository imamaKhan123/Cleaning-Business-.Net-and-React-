using System.Runtime.InteropServices;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using System.Threading.Tasks;public interface IBookingService
{
    Task<Booking> CreateAsync(BookingDto dto, Guid userId);
    Task<List<Booking>> GetAllAsync(Guid userId);
    Task<Booking?> GetByIdAsync(Guid id, Guid userId);
    Task<BookingDtoResponse?> UpdateAsync(Guid id, BookingDto dto, Guid userId);
    Task<BookingDtoResponse> CancelBookingAsync(Guid id, Guid userId);
    Task<bool> DeleteAsync(Guid id, Guid userId);
}






public class BookingService : IBookingService
{
    private readonly AppDbContext _db;
    private readonly JobService _jobService;

    public BookingService(AppDbContext db, JobService jobService) {
        _db = db;
          _jobService = jobService;
    } 

    public async Task<Booking> CreateAsync(BookingDto dto, Guid userId)
    {
        var booking = new Booking
        {
            Id = Guid.NewGuid(), // ensure Booking ID is Guid
            Service = dto.Service,
            Date = dto.Date,
            Time = dto.Time,
            Address = dto.Address,
            Price = dto.Price,
            AddOns = dto.AddOns,
            SpecialInstructions = dto.SpecialInstructions,
            Frequency = dto.Frequency,
             Cleaner = dto.Cleaner,
        Status = string.IsNullOrEmpty(dto.Status) ? "scheduled" : dto.Status,
       
            UserId = userId
        };

        _db.Bookings.Add(booking);
        await _db.SaveChangesAsync();
         // Load the related user
        booking.User = await _db.Users.FindAsync(userId);
     await _jobService.CreateFromBookingAsync(booking);
        return booking;
    }

    public async Task<List<Booking>> GetAllAsync(Guid userId)
    {
        return await _db.Bookings
            .Where(b => b.UserId == userId)
            .ToListAsync();
    }

    public async Task<Booking?> GetByIdAsync(Guid id, Guid userId)
    {
        return await _db.Bookings
            .FirstOrDefaultAsync(b => b.Id == id && b.UserId == userId);
    }

 public async Task<BookingDtoResponse?> UpdateAsync(Guid id, BookingDto dto, Guid userId)
{
    var booking = await _db.Bookings
        .Include(b => b.User)
        .FirstOrDefaultAsync(b => b.Id == id && b.UserId == userId);

    if (booking == null) return null;

    // Update only if values are provided
    if (!string.IsNullOrEmpty(dto.Service)) booking.Service = dto.Service;
    if (dto.Date != default) booking.Date = dto.Date;  // avoid null/empty date
    if (!string.IsNullOrEmpty(dto.Time)) booking.Time = dto.Time;
    if (!string.IsNullOrEmpty(dto.Address)) booking.Address = dto.Address;
    if (dto.Price > 0) booking.Price = dto.Price;
   // if (!string.IsNullOrEmpty(dto.AddOns.Length())) booking.AddOns = dto.AddOns;
    if (!string.IsNullOrEmpty(dto.SpecialInstructions)) booking.SpecialInstructions = dto.SpecialInstructions;
    if (!string.IsNullOrEmpty(dto.Frequency)) booking.Frequency = dto.Frequency;
    if (!string.IsNullOrEmpty(dto.Cleaner)) booking.Cleaner = dto.Cleaner;
    if (!string.IsNullOrEmpty(dto.Status)) booking.Status = dto.Status;

    await _db.SaveChangesAsync();

    await _jobService.UpdateFromBookingAsync(booking);
// Return DTO to avoid object cycles
    return new BookingDtoResponse
    {
        Id = booking.Id,
        Service = booking.Service,
        Date = booking.Date,
        Time = booking.Time,
        Address = booking.Address,
        Price = booking.Price,
      //  AddOns = booking.AddOns.,
        SpecialInstructions = booking.SpecialInstructions,
        Frequency = booking.Frequency,
        Status = booking.Status,
        Cleaner = booking.Cleaner
    };
}
    public async Task<BookingDtoResponse?> CancelBookingAsync(Guid id, Guid userId)
{
    // Find the booking for this user
    var booking = await _db.Bookings
        .Include(b => b.User)
        .FirstOrDefaultAsync(b => b.Id == id && b.UserId == userId);

    if (booking == null) return null;

    // Update booking status
    booking.Status = "cancelled";

    // Save changes to booking first
    await _db.SaveChangesAsync();

    // Update the related job(s)
    var job = await _db.Jobs.FirstOrDefaultAsync(j => j.BookingId == booking.Id);
    if (job != null)
    {
        job.Status = "cancelled";
        job.AssignedTo = null;
        job.AssignedName = "Unassigned";

        await _db.SaveChangesAsync();
    }

    // Return a response DTO
    return new BookingDtoResponse
    {
        Id = booking.Id,
        Service = booking.Service,
        Date = booking.Date,
        Time = booking.Time,
        Address = booking.Address,
        Price = booking.Price,
       // AddOns = booking.AddOns,
        SpecialInstructions = booking.SpecialInstructions,
        Frequency = booking.Frequency,
        Status = booking.Status,
        Cleaner = booking.Cleaner
    };
}

    public async Task<bool> DeleteAsync(Guid id, Guid userId)
    {
        var booking = await GetByIdAsync(id, userId);
        if (booking == null) return false;

        _db.Bookings.Remove(booking);
        await _db.SaveChangesAsync();
        return true;
    }
}
