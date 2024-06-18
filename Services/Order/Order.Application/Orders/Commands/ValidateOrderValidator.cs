namespace Order.Application.Orders.Commands;

public class ValidateOrderValidator : AbstractValidator<ValidateOrderCommand>
{
    public ValidateOrderValidator()
    {
        RuleFor(c => c.OrderId)
            .NotEqual(Guid.Empty);
    }
}