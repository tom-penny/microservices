namespace Order.Application.Orders.Queries;

using Domain.Entities;

public record GetAllOrdersQuery(string CustomerId) : IRequest<Result<List<Order>>>;