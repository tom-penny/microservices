namespace Order.Application.Orders.Commands;

public record ValidateOrderCommand(Guid OrderId, bool IsValid) : IRequest<Result<Unit>>;