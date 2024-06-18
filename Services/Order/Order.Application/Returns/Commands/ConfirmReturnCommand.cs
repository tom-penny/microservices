namespace Order.Application.Returns.Commands;

public record ConfirmReturnCommand(Guid Id) : IRequest<Result<Unit>>;