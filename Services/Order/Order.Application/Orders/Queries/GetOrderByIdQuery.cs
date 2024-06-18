namespace Order.Application.Orders.Queries;

using Domain.Entities;

public record GetOrderByIdQuery(Guid Id) : IRequest<Result<Order>>;