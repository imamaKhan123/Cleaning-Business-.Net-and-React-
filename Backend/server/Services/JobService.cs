using Microsoft.EntityFrameworkCore;

public class JobService
{
    private readonly AppDbContext _db;

    public JobService(AppDbContext db)
    {
        _db = db;
    }

    // 🔹 Create a job automatically from a booking
    public async Task<Job> CreateFromBookingAsync(Booking booking)
    {
        var user = await _db.Users.FindAsync(booking.UserId);

        var job = new Job
        {
            Id = Guid.NewGuid(),
            BookingId = booking.Id,
            CustomerId = booking.UserId,
            CustomerName = user?.Name ?? "Unknown",
            Service = booking.Service,
            Date = booking.Date,
            Time = booking.Time,
            Address = booking.Address,
            AssignedTo = null,
            AssignedName = "Unassigned",
            Status = "scheduled",
            Price = booking.Price,
            Priority = booking.Service.ToLower().Contains("move-out") ? "high" : "medium"
        };

        _db.Jobs.Add(job);
        await _db.SaveChangesAsync();

        return job;
    }

    // 🔹 Get all jobs
    public async Task<List<Job>> GetAllAsync()
    {
        return await _db.Jobs.Include(j => j.Booking).ToListAsync();
    }

    // 🔹 Update job status or assign staff
public async Task<JobDto?> AssignStaffToJob(Guid jobId, Guid staffId)
{
    var job = await _db.Jobs
        .Include(j => j.Booking) // include Booking for updating status
        .FirstOrDefaultAsync(j => j.Id == jobId);

    if (job == null)
        throw new Exception("Job not found");

    var staff = await _db.Staff.FindAsync(staffId);
    if (staff == null)
        throw new Exception("Staff not found");

    // Assign staff to job
    job.AssignedTo = staff.Id;
    job.AssignedName = staff.Name;
    job.Status = "Assigned"; // job status

        // Update booking status
        if (job.Booking != null)
        {
            job.Booking.Status = "Assigned";
        job.Booking.Cleaner = staff.Name ;
    }

    await _db.SaveChangesAsync();

    return new JobDto
{
    Id = job.Id,
    Service = job.Service,
    Status = job.Status,
    AssignedTo = job.AssignedTo,
    AssignedName = job.AssignedName
};
}


}
