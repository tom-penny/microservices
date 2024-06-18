namespace Order.Application.Refunds.Commands;

using Domain.Entities;

public record CreateRefundCommand(List<Guid> ReturnIds) : IRequest<Result<Refund>>;