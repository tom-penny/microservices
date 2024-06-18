namespace Order.Application.Orders.Commands;

public record CreateOrderItem(string ProductId, int Quantity, decimal UnitPrice);

public class CreateOrderCommand : IRequest<Result<Unit>>
{
    public string CheckoutId { get; set; }
    public string CustomerId { get; set; }
    public string AddressId { get; set; }
    public decimal Amount { get; set; }
    public List<CreateOrderItem> Items { get; set; }
}