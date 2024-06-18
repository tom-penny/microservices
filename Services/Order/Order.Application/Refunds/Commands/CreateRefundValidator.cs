namespace Order.Application.Refunds.Commands;

public class CreateRefundValidator : AbstractValidator<CreateRefundCommand>
{
    public CreateRefundValidator()
    {
        RuleFor(c => c.ReturnIds)
            .NotEmpty();

        RuleForEach(c => c.ReturnIds)
            .NotEqual(Guid.Empty);
    }
}