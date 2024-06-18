namespace Order.IntegrationEvents;

public record OrderConfirmedItem(string ProductId, int Quantity, decimal UnitPrice);

public class OrderConfirmedEvent
{
    public required Guid OrderId { get; init; }
    public List<OrderConfirmedItem> Items { get; init; }
}