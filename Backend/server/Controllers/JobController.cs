using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
[ApiController]
[Route("api/[controller]")]
[Authorize]
public class JobsController : ControllerBase
{
    private readonly JobService _jobService;

    public JobsController(JobService jobService)
    {
        _jobService = jobService;
    }

    // GET: api/jobs
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var jobs = await _jobService.GetAllAsync();
        return Ok(jobs);
    }

    // PATCH: api/jobs/{id}
    [HttpPatch("{id}")]
    public async Task<IActionResult> UpdateJob(Guid id, [FromBody] UpdateJobDto dto)
    {
        
        var job = await _jobService.AssignStaffToJob(id, dto.AssignedTo);
        if (job == null) return NotFound();
        return Ok(job);
    }
}

public class UpdateJobDto
{
    public string? Status { get; set; }
    public Guid AssignedTo { get; set; }
    public string? AssignedName { get; set; }
}public class JobDto
{
    public Guid Id { get; set; }
    public string Service { get; set; }
    public string Status { get; set; }
    public Guid? AssignedTo { get; set; }
    public string AssignedName { get; set; }
}

