namespace Order.Domain.Events;

using Entities;
using Primitives;

public record OrderCancelled(Order Order) : DomainEvent;