using Microsoft.Extensions.Logging;

namespace Order.Application.Orders.Events;

using Domain.Events;
using Interfaces;
using IntegrationEvents;

public class OrderConfirmedHandler : INotificationHandler<OrderConfirmed>
{
    private readonly ILogger<OrderConfirmedHandler> _logger;
    private readonly IEventBus _eventBus;

    public OrderConfirmedHandler(ILogger<OrderConfirmedHandler> logger, IEventBus eventBus)
    {
        _logger = logger;
        _eventBus = eventBus;
    }

    public async Task Handle(OrderConfirmed notification, CancellationToken cancellationToken)
    {
        _logger.LogInformation("{@DateTime}: Started {@Request}",
            nameof(OrderConfirmedHandler), DateTime.UtcNow);
        
        var integrationEvent = new OrderConfirmedEvent
        {
            OrderId = notification.Order.Id.Value,
            Items = notification.Order.Items
                .Select(item => new OrderConfirmedItem
                (
                    item.ProductId.Value,
                    item.Quantity,
                    item.UnitPrice
                ))
                .ToList()
        };

        await _eventBus.Publish(integrationEvent, cancellationToken);
        
        _logger.LogInformation("{@DateTime}: Completed {@Request}",
            nameof(OrderConfirmedHandler), DateTime.UtcNow);
    }
}