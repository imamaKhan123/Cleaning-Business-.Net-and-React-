public interface IUserService
{
    Task<AppUser?> GetByEmailAsync(string email);
    Task<AppUser> CreateAsync(string email, string password, string role = "User");
    Task<bool> CheckPasswordAsync(AppUser user, string password);
}