public class StaffRegisterDto
{
    public string Name { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string Phone { get; set; }
    public string Specialties { get; set; }
}

public class StaffResponseDto
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string Phone { get; set; }
    public string Role { get; set; }
    public string Status { get; set; }
    public double Rating { get; set; }
    public int JobsCompleted { get; set; }
    public string Specialties { get; set; }
    public string Token { get; set; }
}
