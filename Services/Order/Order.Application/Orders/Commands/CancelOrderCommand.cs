namespace Order.Application.Orders.Commands;

public record CancelOrderCommand(Guid Id) : IRequest<Result<Unit>>;