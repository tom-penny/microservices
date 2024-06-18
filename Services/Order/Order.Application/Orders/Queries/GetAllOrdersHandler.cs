namespace Order.Application.Orders.Queries;

using Domain.Entities;
using Interfaces;

public class GetAllOrdersHandler : IRequestHandler<GetAllOrdersQuery, Result<List<Order>>>
{
    private readonly IApplicationDbContext _context;

    public GetAllOrdersHandler(IApplicationDbContext context)
    {
        _context = context;
    }
    
    public async Task<Result<List<Order>>> Handle(GetAllOrdersQuery request, CancellationToken cancellationToken)
    {
        var orders = await _context.Orders.Include(o => o.Items)
            .Where(o => o.CustomerId == new CustomerId(request.CustomerId))
            .ToListAsync(cancellationToken);

        return Result.Ok(orders);
    }
}