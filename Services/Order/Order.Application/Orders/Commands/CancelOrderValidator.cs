namespace Order.Application.Orders.Commands;

public class CancelOrderValidator : AbstractValidator<CancelOrderCommand>
{
    public CancelOrderValidator()
    {
        RuleFor(c => c.Id)
            .NotEqual(Guid.Empty);
    }
}