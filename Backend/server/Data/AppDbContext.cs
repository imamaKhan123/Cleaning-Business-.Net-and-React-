using Microsoft.EntityFrameworkCore;
using BCrypt.Net; 
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Staff> Staff { get; set; } = null!;
    public DbSet<AppUser> Users { get; set; } = null!;
    public DbSet<Booking> Bookings { get; set; } = null!;
    public DbSet<Job> Jobs { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    base.OnModelCreating(modelBuilder);

    modelBuilder.Entity<Booking>()
        .HasOne(b => b.User)
        .WithMany(u => u.Bookings)
        .HasForeignKey(b => b.UserId)
        .OnDelete(DeleteBehavior.Cascade);

    // Job → Staff relation
    modelBuilder.Entity<Job>()
        .HasOne(j => j.AssignedStaff)
        .WithMany(s => s.Jobs)
        .HasForeignKey(j => j.AssignedTo)
        .OnDelete(DeleteBehavior.SetNull);// if staff deleted, job remains but unassigned
modelBuilder.Entity<Staff>().HasData(
    new Staff {
        Id = Guid.Parse("11111111-1111-1111-1111-111111111111"),
        Name = "Jane Doe",
        Email = "jane1@example.com",
        Phone = "555-1001",
        Status = "active",
        Rating = 4.5,
        PasswordHash = "$2a$11$EIX4n0kIEuFhXDJ1yJsy..PCMLz7pQ6XZ8UoRQvM5CnxyyCP6Yl82"
    }
);

   
}
}
