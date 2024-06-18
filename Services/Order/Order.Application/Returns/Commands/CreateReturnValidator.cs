namespace Order.Application.Returns.Commands;

public class CreateReturnValidator : AbstractValidator<CreateReturnCommand>
{
    public CreateReturnValidator()
    {
        RuleFor(c => c.OrderItemId)
            .NotEqual(Guid.Empty);
        
        RuleFor(c => c.Quantity)
            .GreaterThan(0);
    }
}