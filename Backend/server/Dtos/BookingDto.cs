public class BookingDtoResponse
{
    public Guid Id { get; set; }
    public string Service { get; set; }
    public DateTime Date { get; set; }
    public string Time { get; set; }
    public string Address { get; set; }
    public decimal Price { get; set; }
    public string AddOns { get; set; }
    public string SpecialInstructions { get; set; }
    public string Frequency { get; set; }
    public string Status { get; set; }
    public string Cleaner { get; set; }
}
