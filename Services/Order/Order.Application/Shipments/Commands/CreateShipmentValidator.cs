namespace Order.Application.Shipments.Commands;

public class CreateShipmentValidator : AbstractValidator<CreateShipmentCommand>
{
    public CreateShipmentValidator()
    {
        RuleFor(c => c.OrderId)
            .NotEqual(Guid.Empty);

        RuleFor(c => c.CarrierId)
            .NotEqual(Guid.Empty);
    }
}