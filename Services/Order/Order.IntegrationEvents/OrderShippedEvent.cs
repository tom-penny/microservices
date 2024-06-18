namespace Order.IntegrationEvents;

public record OrderShippedItem(string ProductId, int Quantity, decimal UnitPrice);

public class OrderShippedEvent
{
    public required Guid OrderId { get; init; }
    public List<OrderShippedItem> Items { get; init; }
}