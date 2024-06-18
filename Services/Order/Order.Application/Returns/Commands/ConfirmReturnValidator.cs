namespace Order.Application.Returns.Commands;

public class ConfirmReturnValidator : AbstractValidator<ConfirmReturnCommand>
{
    public ConfirmReturnValidator()
    {
        RuleFor(c => c.Id)
            .NotEqual(Guid.Empty);
    }
}