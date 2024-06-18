namespace Order.Application.Orders.Commands;

using Interfaces;
using Domain.Entities;

public class ValidateOrderHandler : IRequestHandler<ValidateOrderCommand, Result<Unit>>
{
    private readonly IApplicationDbContext _context;

    public ValidateOrderHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result<Unit>> Handle(ValidateOrderCommand request, CancellationToken cancellationToken)
    {
        var order = await _context.Orders.FirstOrDefaultAsync(o =>
            o.Id == new OrderId(request.OrderId), cancellationToken);

        if (order == null) return Result.Fail($"Order {request.OrderId} not found");

        if (request.IsValid)
        {
            order.SetProcessing();
        }
        else
        {
            order.SetCancelled();
        }
        
        await _context.SaveChangesAsync(cancellationToken);

        return Result.Ok();
    }
}