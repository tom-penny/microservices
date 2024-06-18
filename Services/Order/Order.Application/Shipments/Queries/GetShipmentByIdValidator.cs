namespace Order.Application.Shipments.Queries;

public class GetShipmentByIdValidator : AbstractValidator<GetShipmentByIdQuery>
{
    public GetShipmentByIdValidator()
    {
        RuleFor(q => q.Id)
            .NotEqual(Guid.Empty);
    }
}