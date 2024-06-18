namespace Order.API.Models.Requests;

public class CreateReturnRequest
{
    public required Guid OrderItemId { get; init; }
    public required int Quantity { get; init; }
    public required string Reason { get; init; }
}