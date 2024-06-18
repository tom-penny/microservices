namespace Order.Application.Shipments.Commands;

public record UpdateShipmentCommand(Guid Id, DateTime DeliveryDate) : IRequest<Result<Unit>>;