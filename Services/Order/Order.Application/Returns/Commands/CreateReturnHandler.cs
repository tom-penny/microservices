namespace Order.Application.Returns.Commands;

using Domain.Entities;
using Interfaces;

public class CreateReturnHandler : IRequestHandler<CreateReturnCommand, Result<Return>>
{
    private readonly IApplicationDbContext _context;

    public CreateReturnHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result<Return>> Handle(CreateReturnCommand request, CancellationToken cancellationToken)
    {
        var item = await _context.OrderItems.FirstOrDefaultAsync(i =>
            i.Id == new OrderItemId(request.OrderItemId), cancellationToken);

        if (item == null) return Result.Fail($"Order item {request.OrderItemId} not found");

        var existingQuantity = await _context.Returns
            .Where(r => r.OrderItemId == item.Id)
            .SumAsync(r => r.Quantity, cancellationToken);

        if (existingQuantity + request.Quantity > item.Quantity)
        {
            return Result.Fail("Return quantity exceeded");
        }

        var @return = new Return
        {
            Id = new ReturnId(Guid.NewGuid()),
            OrderItemId = item.Id,
            Quantity = request.Quantity,
            Reason = request.Reason,
            IsReceived = false
        };

        _context.Returns.Add(@return);

        await _context.SaveChangesAsync(cancellationToken);

        return Result.Ok(@return);
    }
}