namespace Order.Application.Shipments.Commands;

using Domain.Entities;
using Interfaces;

public class CreateShipmentHandler : IRequestHandler<CreateShipmentCommand, Result<Shipment>>
{
    private readonly IApplicationDbContext _context;

    public CreateShipmentHandler(IApplicationDbContext context)
    {
        _context = context;
    }
    
    public async Task<Result<Shipment>> Handle(CreateShipmentCommand request, CancellationToken cancellationToken)
    {
        var order = await _context.Orders.FirstOrDefaultAsync(o =>
            o.Id == new OrderId(request.OrderId), cancellationToken);

        if (order == null) return Result.Fail($"Order {request.OrderId} not found");

        var shipment = new Shipment
        {
            Id = new ShipmentId(Guid.NewGuid()),
            OrderId = order.Id,
            CarrierId = new CarrierId(request.CarrierId),
        };
        
        shipment.SetDispatchDate(DateTime.UtcNow);

        _context.Shipments.Add(shipment);

        await _context.SaveChangesAsync(cancellationToken);
        
        return Result.Ok(shipment);
    }
}