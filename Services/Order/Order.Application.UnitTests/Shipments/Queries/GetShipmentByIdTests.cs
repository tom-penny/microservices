namespace Order.Application.UnitTests.Shipments.Queries;

using Domain.Entities;
using Application.Shipments.Queries;

public class GetShipmentByIdTests
{
    private readonly MockDbContext _mockContext;
    private readonly GetShipmentByIdHandler _handler;
    private readonly GetShipmentByIdValidator _validator;

    public GetShipmentByIdTests()
    {
        _mockContext = new MockDbContext();
        _handler = new GetShipmentByIdHandler(_mockContext.Context.Object);
        _validator = new GetShipmentByIdValidator();
    }

    [Fact]
    public async Task GetShipmentById_ShouldSucceed_WhenRequestValid()
    {
        var shipmentId = Guid.NewGuid();

        var shipment1 = new Shipment
        {
            Id = new ShipmentId(shipmentId),
            CarrierId = new CarrierId(Guid.NewGuid()),
            OrderId = new OrderId(Guid.NewGuid())
        };
        
        var shipment2 = new Shipment
        {
            Id = new ShipmentId(Guid.NewGuid()),
            CarrierId = new CarrierId(Guid.NewGuid()),
            OrderId = new OrderId(Guid.NewGuid())
        };
        
        _mockContext.Shipments.AddRange(new List<Shipment> { shipment1, shipment2 });
        
        var query = new GetShipmentByIdQuery(shipmentId);

        var result = await _handler.Handle(query, default);

        result.IsSuccess.Should().BeTrue();
        result.Value.Should().BeSameAs(shipment1);
    }

    [Fact]
    public async Task GetShipmentById_ShouldFail_WhenShipmentNotFound()
    {
        var shipment1 = new Shipment
        {
            Id = new ShipmentId(Guid.NewGuid()),
            CarrierId = new CarrierId(Guid.NewGuid()),
            OrderId = new OrderId(Guid.NewGuid())
        };
        
        var shipment2 = new Shipment
        {
            Id = new ShipmentId(Guid.NewGuid()),
            CarrierId = new CarrierId(Guid.NewGuid()),
            OrderId = new OrderId(Guid.NewGuid())
        };
        
        _mockContext.Shipments.AddRange(new List<Shipment> { shipment1, shipment2 });
        
        var query = new GetShipmentByIdQuery(Guid.NewGuid());

        var result = await _handler.Handle(query, default);

        result.IsFailed.Should().BeTrue();
    }

    [Fact]
    public void GetShipmentById_ShouldReturnError_WhenIdEmpty()
    {
        var query = new GetShipmentByIdQuery(Guid.Empty);
        var result = _validator.TestValidate(query);

        result.ShouldHaveValidationErrorFor(q => q.Id);
    }
}