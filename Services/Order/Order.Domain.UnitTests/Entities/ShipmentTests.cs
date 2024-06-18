namespace Order.Domain.UnitTests.Entities;

using Domain.Entities;
using Domain.Events;

public class ShipmentTests
{
    private readonly Shipment _shipment;

    public ShipmentTests()
    {
        _shipment = new Shipment
        {
            Id = new ShipmentId(Guid.NewGuid()),
            CarrierId = new CarrierId(Guid.NewGuid()),
            OrderId = new OrderId(Guid.NewGuid())
        };
    }
    
    [Fact]
    public void SetDispatchDate_ShouldSetDateDispatched()
    {
        var dispatchDate = DateTime.Now;
        
        _shipment.SetDispatchDate(dispatchDate);

        _shipment.DateDispatched.Should().Be(dispatchDate);
    }
    
    [Fact]
    public void SetDeliveryDate_ShouldSetDateDelivered()
    {
        var deliveryDate = DateTime.Now;
        
        _shipment.SetDeliveryDate(deliveryDate);

        _shipment.DateDelivered.Should().Be(deliveryDate);
    }
    
    [Fact]
    public void SetDispatchDate_ShouldAddShipmentDispatchedEvent()
    {
        _shipment.SetDispatchDate(DateTime.Now);

        _shipment.Events.Should().Contain(e =>
            e.GetType() == typeof(ShipmentDispatched));
    }

    [Fact]
    public void SetDeliveryDate_ShouldAddShipmentDeliveredEvent()
    {
        _shipment.SetDeliveryDate(DateTime.Now);

        _shipment.Events.Should().Contain(e =>
            e.GetType() == typeof(ShipmentDelivered));
    }
}