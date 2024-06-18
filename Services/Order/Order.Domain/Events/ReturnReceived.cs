namespace Order.Domain.Events;

using Entities;
using Primitives;

public record ReturnReceived(Return Return) : DomainEvent;