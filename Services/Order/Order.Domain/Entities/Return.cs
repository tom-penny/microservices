namespace Order.Domain.Entities;

using Events;
using Primitives;

public record ReturnId(Guid Value);

public class Return : BaseEntity
{
    public required ReturnId Id { get; init; }
    public required OrderItemId OrderItemId { get; init; }
    public required int Quantity { get; init; }
    public required string Reason { get; init; }
    public required bool IsReceived { get; set; }
    public RefundId? RefundId { get; set; }

    public void SetReceived()
    {
        IsReceived = true;
        AddDomainEvent(new ReturnReceived(this));
    }
}