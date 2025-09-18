using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Job
{
    public Guid Id { get; set; }

    public Guid BookingId { get; set; }
    public Booking Booking { get; set; }

    public Guid CustomerId { get; set; }
    public string CustomerName { get; set; }

    public string Service { get; set; }
    public DateTime Date { get; set; }
    public string Time { get; set; }
    public string Address { get; set; }

    // 🔑 Staff assignment
    public Guid? AssignedTo { get; set; } // Staff.Id
    [ForeignKey("AssignedTo")]
    public Staff? AssignedStaff { get; set; }  // Navigation property

    public string? AssignedName { get; set; } // Optional, can be derived from AssignedStaff.Name

    public string Status { get; set; } // scheduled | in-progress | completed | cancelled
    public decimal Price { get; set; }
    public string Priority { get; set; } // low | medium | high
}
