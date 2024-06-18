namespace Order.Domain.Entities;

using Primitives;

public record RefundId(Guid Value);

public class Refund : BaseEntity
{
    public required RefundId Id { get; init; }
    public List<Return> Returns { get; init; } = new();
}