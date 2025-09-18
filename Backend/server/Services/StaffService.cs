using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

public interface IStaffService
{
    Task<StaffResponseDto> RegisterAsync(StaffRegisterDto dto);
    Task<StaffResponseDto> LoginAsync(string email, string password);
    Task<List<Staff>> GetAllAsync();
    Task<StaffResponseDto> GetByIdAsync(Guid id);
    Task<StaffResponseDto> UpdateAsync(Guid id, StaffRegisterDto dto);
    Task<bool> DeleteAsync(Guid id);
}

public class StaffService : IStaffService
{
    private readonly AppDbContext _context;

    public StaffService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<StaffResponseDto> RegisterAsync(StaffRegisterDto dto)
    {
        if (await _context.Staff.AnyAsync(s => s.Email == dto.Email))
            throw new Exception("Email already exists");

        var staff = new Staff
        {
            Name = dto.Name,
            Email = dto.Email,
            Phone = dto.Phone,
            Specialties = dto.Specialties,
            PasswordHash = HashPassword(dto.Password)
        };

        _context.Staff.Add(staff);
        await _context.SaveChangesAsync();

        return MapToDto(staff);
    }

    public async Task<StaffResponseDto> LoginAsync(string email, string password)
    {
        var staff = await _context.Staff.FirstOrDefaultAsync(s => s.Email == email);
        if (staff == null || staff.PasswordHash != HashPassword(password))
            throw new Exception("Invalid email or password");

        return MapToDto(staff);
    }

    public async Task<List<Staff>> GetAllAsync()
    {
        return await _context.Staff.ToListAsync();
            // .Select(s => MapToDto(s))
           
    }

    public async Task<StaffResponseDto> GetByIdAsync(Guid id)
    {
        var staff = await _context.Staff.FindAsync(id);
        if (staff == null) throw new Exception("Staff not found");
        return MapToDto(staff);
    }

    public async Task<StaffResponseDto> UpdateAsync(Guid id, StaffRegisterDto dto)
    {
        var staff = await _context.Staff.FindAsync(id);
        if (staff == null) throw new Exception("Staff not found");

        staff.Name = dto.Name;
        staff.Email = dto.Email;
        staff.Phone = dto.Phone;
        staff.Specialties = dto.Specialties;
        if (!string.IsNullOrEmpty(dto.Password))
            staff.PasswordHash = HashPassword(dto.Password);

        await _context.SaveChangesAsync();
        return MapToDto(staff);
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var staff = await _context.Staff.FindAsync(id);
        if (staff == null) return false;

        _context.Staff.Remove(staff);
        await _context.SaveChangesAsync();
        return true;
    }

    // ---------------- Helpers ----------------
    private string HashPassword(string password)
    {
        using var sha256 = SHA256.Create();
        var bytes = Encoding.UTF8.GetBytes(password);
        var hash = sha256.ComputeHash(bytes);
        return Convert.ToBase64String(hash);
    }

    private StaffResponseDto MapToDto(Staff s)
    {
        return new StaffResponseDto
        {
            Id = s.Id,
            Name = s.Name,
            Email = s.Email,
            Phone = s.Phone,
            Role = s.Role,
            Status = s.Status,
            Rating = s.Rating,
            JobsCompleted = s.JobsCompleted,
            Specialties = s.Specialties // optional: generate JWT token here
        };
    }
}
