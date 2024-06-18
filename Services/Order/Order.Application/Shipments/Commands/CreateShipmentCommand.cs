namespace Order.Application.Shipments.Commands;

using Domain.Entities;

public record CreateShipmentCommand(Guid OrderId, Guid CarrierId) : IRequest<Result<Shipment>>;