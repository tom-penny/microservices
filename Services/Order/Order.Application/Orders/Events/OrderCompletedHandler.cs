using Microsoft.Extensions.Logging;

namespace Order.Application.Orders.Events;

using Domain.Events;

public class OrderCompletedHandler : INotificationHandler<OrderCompleted>
{
    private readonly ILogger<OrderCompletedHandler> _logger;

    public OrderCompletedHandler(ILogger<OrderCompletedHandler> logger)
    {
        _logger = logger;
    }

    public async Task Handle(OrderCompleted notification, CancellationToken cancellationToken)
    {
        _logger.LogInformation("{@DateTime}: Started {@Request}",
            nameof(OrderCompletedHandler), DateTime.UtcNow);
        
        _logger.LogInformation("{@DateTime}: Completed {@Request}",
            nameof(OrderCompletedHandler), DateTime.UtcNow);
    }
}