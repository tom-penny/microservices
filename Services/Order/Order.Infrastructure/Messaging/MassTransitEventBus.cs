namespace Order.Infrastructure.Messaging;

using Application.Interfaces;

public class MassTransitEventBus : IEventBus
{
    private readonly IPublishEndpoint _eventBus;

    public MassTransitEventBus(IPublishEndpoint eventBus)
    {
        _eventBus = eventBus;
    }
    
    public async Task Publish<TEvent>(TEvent @event, CancellationToken cancellationToken = default) where TEvent : class
    {
        await _eventBus.Publish(@event, cancellationToken);
    }
}