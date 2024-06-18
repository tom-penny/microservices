namespace Order.API.Mappers;

using Domain.Entities;
using Models.Responses;

public static class ShipmentMapper
{
    public static ShipmentResponse ToResponse(this Shipment shipment)
    {
        return new ShipmentResponse
        {
            Id = shipment.Id.Value.ToString(),
            OrderId = shipment.OrderId.Value.ToString(),
            CarrierId = shipment.CarrierId.Value.ToString(),
            DateDispatched = shipment.DateDispatched,
            DateDelivered = shipment.DateDelivered
        };
    }
}