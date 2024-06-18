namespace Order.API.Models.Responses;

public class ReturnResponse
{
    public required string Id { get; init; }
    public required string OrderItemId { get; init; }
    public required int Quantity { get; init; }
    public required string Reason { get; init; }
    public required bool IsReceived { get; init; }
    public string? RefundId { get; set; }
}