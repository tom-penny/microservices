namespace Order.Domain.Events;

using Entities;
using Primitives;

public record OrderConfirmed(Order Order) : DomainEvent;