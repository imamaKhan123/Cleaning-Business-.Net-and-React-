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
    Task<Booking?> UpdateAsync(Guid id, BookingDto dto, Guid userId);
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

    public async Task<Booking?> UpdateAsync(Guid id, BookingDto dto, Guid userId)
    {
        var booking = await GetByIdAsync(id, userId);
        if (booking == null) return null;

        booking.Service = dto.Service;
        booking.Date = dto.Date;
        booking.Time = dto.Time;
        booking.Address = dto.Address;
        booking.Price = dto.Price;
        booking.AddOns = dto.AddOns;
        booking.SpecialInstructions = dto.SpecialInstructions;
        booking.Frequency = dto.Frequency;
        booking.Status = dto.Status;


        await _db.SaveChangesAsync();
        return booking;
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
