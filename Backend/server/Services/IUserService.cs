public interface IUserService
{
    Task<AppUser?> GetByEmailAsync(string email);
    Task<AppUser> CreateAsync(string email, string password,string name, string role = "User");
    Task<bool> CheckPasswordAsync(AppUser user, string password);
}