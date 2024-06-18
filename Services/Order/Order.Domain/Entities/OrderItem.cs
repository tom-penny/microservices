namespace Order.Domain.Entities;

using Primitives;

public record OrderItemId(Guid Value);
public record ProductId(string Value);

public class OrderItem : BaseEntity
{
    public required OrderItemId Id { get; init; }
    public required OrderId OrderId { get; init; }
    public required ProductId ProductId { get; init; }
    public required int Quantity { get; set; }
    public required decimal UnitPrice { get; set; }
}