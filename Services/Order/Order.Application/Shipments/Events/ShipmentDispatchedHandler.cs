using Microsoft.Extensions.Logging;

namespace Order.Application.Shipments.Events;

using Domain.Events;
using Interfaces;
using IntegrationEvents;

public class ShipmentDispatchedHandler : INotificationHandler<ShipmentDispatched>
{
    private readonly ILogger<ShipmentDispatchedHandler> _logger;
    private readonly IEventBus _eventBus;
    private readonly IApplicationDbContext _context;

    public ShipmentDispatchedHandler(ILogger<ShipmentDispatchedHandler> logger,
        IEventBus eventBus, IApplicationDbContext context)
    {
        _logger = logger;
        _eventBus = eventBus;
        _context = context;
    }

    public async Task Handle(ShipmentDispatched notification, CancellationToken cancellationToken)
    {
        _logger.LogInformation("{@DateTime}: Started {@Request}",
            nameof(ShipmentDispatchedHandler), DateTime.UtcNow);
        
        var order = await _context.Orders.Include(o => o.Items)
            .FirstOrDefaultAsync(o => o.Id == notification.Shipment.OrderId, cancellationToken);

        if (order == null) throw new Exception();
        
        var integrationEvent = new OrderShippedEvent
        {
            OrderId = order.Id.Value,
            Items = order.Items
                .Select(item => new OrderShippedItem
                (
                    item.ProductId.Value,
                    item.Quantity,
                    item.UnitPrice
                ))
                .ToList()
        };

        await _eventBus.Publish(integrationEvent, cancellationToken);
        
        _logger.LogInformation("{@DateTime}: Completed {@Request}",
            nameof(ShipmentDispatchedHandler), DateTime.UtcNow);
    }
}