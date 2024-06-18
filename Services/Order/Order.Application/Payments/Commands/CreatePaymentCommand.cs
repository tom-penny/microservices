namespace Order.Application.Payments.Commands;

public class CreatePaymentCommand : IRequest<Result<Unit>>
{
    public required string CheckoutId { get; init; }
    public required Guid ProviderId { get; init; }
    public required string Status { get; init; }
    public required decimal Amount { get; init; }
}