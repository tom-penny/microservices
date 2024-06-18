namespace Order.Domain.Primitives;

using MediatR;

public record DomainEvent() : INotification;