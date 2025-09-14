
using BCrypt.Net;
using Microsoft.EntityFrameworkCore;

public class UserService : IUserService
{
    private readonly AppDbContext _db;
    public UserService(AppDbContext db) => _db = db;

    public async Task<AppUser?> GetByEmailAsync(string email)
    {
        return await _db.Users.FirstOrDefaultAsync(u => u.Email == email.ToLowerInvariant());
    }

    public async Task<AppUser> CreateAsync(string email, string password, string role = "User")
    {
        var hash = BCrypt.Net.BCrypt.HashPassword(password);
        var user = new AppUser { Email = email.ToLowerInvariant(), PasswordHash = hash, Role = role };
        _db.Users.Add(user);
        await _db.SaveChangesAsync();
        return user;
    }

    public Task<bool> CheckPasswordAsync(AppUser user, string password)
    {
        return Task.FromResult(BCrypt.Net.BCrypt.Verify(password, user.PasswordHash));
    }
}