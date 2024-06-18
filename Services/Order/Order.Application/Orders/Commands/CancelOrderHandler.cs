namespace Order.Application.Orders.Commands;

using Interfaces;
using Domain.Entities;

public class CancelOrderHandler : IRequestHandler<CancelOrderCommand, Result<Unit>>
{
    private readonly IApplicationDbContext _context;

    public CancelOrderHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result<Unit>> Handle(CancelOrderCommand request, CancellationToken cancellationToken)
    {
        var order = await _context.Orders.FirstOrDefaultAsync(o =>
            o.Id == new OrderId(request.Id), cancellationToken: cancellationToken);

        if (order == null) return Result.Fail($"Order {request.Id} not found");

        order.SetCancelled();
                
        await _context.SaveChangesAsync(cancellationToken);

        return Result.Ok();
    }
}