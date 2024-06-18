namespace Order.Application.UnitTests.Shipments.Commands;

using Domain.Entities;
using Application.Shipments.Commands;

public class UpdateShipmentTests
{
    private readonly MockDbContext _mockContext;
    private readonly UpdateShipmentHandler _handler;
    private readonly UpdateShipmentValidator _validator;
    
    public UpdateShipmentTests()
    {
        _mockContext = new MockDbContext();
        _handler = new UpdateShipmentHandler(_mockContext.Context.Object);
        _validator = new UpdateShipmentValidator();
    }

    [Fact]
    public async Task UpdateShipment_ShouldSucceed_WhenRequestValid()
    {
        var shipmentId = Guid.NewGuid();

        var shipment = new Shipment
        {
            Id = new ShipmentId(shipmentId),
            CarrierId = new CarrierId(Guid.NewGuid()),
            OrderId = new OrderId(Guid.NewGuid())
        };
        
        _mockContext.Shipments.Add(shipment);

        var delivered = DateTime.Now;
        
        var command = new UpdateShipmentCommand(shipmentId, delivered);

        var result = await _handler.Handle(command, default);

        result.IsSuccess.Should().BeTrue();
        shipment.DateDelivered.Should().Be(delivered);
    }

    [Fact]
    public async Task UpdateShipment_ShouldFail_WhenShipmentNotFound()
    {
        var command = new UpdateShipmentCommand(Guid.NewGuid(), DateTime.Now);

        var result = await _handler.Handle(command, default);

        result.IsFailed.Should().BeTrue();
    }
    
    [Fact]
    public void UpdateShipment_ShouldReturnError_WhenIdEmpty()
    {
        var command = new UpdateShipmentCommand(Guid.Empty, DateTime.Now.AddDays(-1));
        var result = _validator.TestValidate(command);

        result.ShouldHaveValidationErrorFor(c => c.Id);
    }
    
    [Fact]
    public void UpdateShipment_ShouldReturnError_WhenDeliveryDateFuture()
    {
        var command = new UpdateShipmentCommand(Guid.NewGuid(), DateTime.Now.AddDays(+1));
        var result = _validator.TestValidate(command);

        result.ShouldHaveValidationErrorFor(c => c.DeliveryDate);
    }
}