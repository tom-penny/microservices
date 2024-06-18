namespace Order.Application.Interfaces;

// Abstraction of message bus, implemented in Order.Infrastructure.

public interface IEventBus
{
    Task Publish<TEvent>(TEvent @event, CancellationToken cancellationToken = default) where TEvent : class;
}