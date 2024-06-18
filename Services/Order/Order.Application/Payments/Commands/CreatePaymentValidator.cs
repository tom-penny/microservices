namespace Order.Application.Payments.Commands;

public class CreatePaymentValidator : AbstractValidator<CreatePaymentCommand>
{
    public CreatePaymentValidator()
    {
        RuleFor(c => c.CheckoutId)
            .NotEmpty();

        RuleFor(c => c.ProviderId)
            .NotEqual(Guid.Empty);

        RuleFor(c => c.Status)
            .NotEmpty();

        RuleFor(c => c.Amount)
            .GreaterThan(0.0m);
    }
}