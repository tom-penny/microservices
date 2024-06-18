namespace Order.Infrastructure.Messaging.Messages;

public record OrderCheckoutItem(string ProductId, int Quantity, decimal UnitPrice);

public class OrderCheckoutMessage
{
    public string CheckoutId { get; init; }
    public string CustomerId { get; init; }
    public string AddressId { get; init; }
    public decimal TotalAmount { get; init; }
    public List<OrderCheckoutItem> Items { get; init; }
}