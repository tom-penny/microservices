namespace Order.API.Models.Responses;

public class OrderResponse
{
    public required string Id { get; init; }
    public required string CheckoutId { get; init; }
    public required string CustomerId { get; init; }
    public required string AddressId { get; init; }
    public required string Status { get; init; }
    public required decimal Amount { get; init; }
    public List<OrderItemResponse> Items { get; init; } = new();
    public string? PaymentId { get; init; }
}