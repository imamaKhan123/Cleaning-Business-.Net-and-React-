public static class SeedData
{
    public static async Task EnsureSeedData(AppDbContext db)
    {
        if (!db.Users.Any())
        {
            var userService = new UserService(db);
            await userService.CreateAsync("admin@local", "Passw0rd!", "Admin");
            await userService.CreateAsync("user@local", "Passw0rd!", "User");
        }
    }
}