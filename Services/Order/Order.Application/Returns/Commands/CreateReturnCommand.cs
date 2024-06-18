namespace Order.Application.Returns.Commands;

using Domain.Entities;

public record CreateReturnCommand(Guid OrderItemId, int Quantity, string Reason) : IRequest<Result<Return>>;