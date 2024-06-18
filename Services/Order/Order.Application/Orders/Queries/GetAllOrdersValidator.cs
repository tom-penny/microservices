namespace Order.Application.Orders.Queries;

public class GetAllOrdersValidator : AbstractValidator<GetAllOrdersQuery>
{
    public GetAllOrdersValidator()
    {
        RuleFor(q => q.CustomerId)
            .NotEmpty();
    }
}