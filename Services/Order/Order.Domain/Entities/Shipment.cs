namespace Order.Domain.Entities;

using Events;
using Primitives;

public record ShipmentId(Guid Value);
public record CarrierId(Guid Value);

public class Shipment : BaseEntity
{
    public required ShipmentId Id { get; init; }
    public required OrderId OrderId { get; init; }
    public required CarrierId CarrierId { get; init; }
    public DateTime? DateDispatched { get; private set; }
    public DateTime? DateDelivered { get; private set; }

    public void SetDispatchDate(DateTime dispatchDate)
    {
        if (DateDispatched != null) return;
        DateDispatched = dispatchDate;
        AddDomainEvent(new ShipmentDispatched(this));
    }
    
    public void SetDeliveryDate(DateTime deliveryDate)
    {
        if (DateDelivered != null) return;
        DateDelivered = deliveryDate;
        AddDomainEvent(new ShipmentDelivered(this));
    }
}