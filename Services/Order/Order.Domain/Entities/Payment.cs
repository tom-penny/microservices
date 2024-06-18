namespace Order.Domain.Entities;

using Enums;
using Primitives;

public record PaymentId(Guid Value);
public record CheckoutId(string Value);

public class Payment : BaseEntity
{
    public required PaymentId Id { get; init; }
    public required CheckoutId CheckoutId { get; init; }
    public required ProviderId ProviderId { get; init; }
    public required decimal Amount { get; init; }
    public required PaymentStatus Status { get; set; }
}