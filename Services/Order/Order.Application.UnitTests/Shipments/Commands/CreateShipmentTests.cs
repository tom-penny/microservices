namespace Order.Application.UnitTests.Shipments.Commands;

using Domain.Entities;
using Domain.Enums;
using Application.Shipments.Commands;

public class CreateShipmentTests
{
    private readonly MockDbContext _mockContext;
    private readonly CreateShipmentHandler _handler;
    private readonly CreateShipmentValidator _validator;
    
    public CreateShipmentTests()
    {
        _mockContext = new MockDbContext();
        _handler = new CreateShipmentHandler(_mockContext.Context.Object);
        _validator = new CreateShipmentValidator();
    }

    [Fact]
    public async Task CreateShipment_ShouldSucceed_WhenRequestValid()
    {
        var orderId = Guid.NewGuid();
        
        var order = new Order
        {
            Id = new OrderId(orderId),
            CheckoutId = new CheckoutId("checkoutId"),
            CustomerId = new CustomerId("customerId"),
            AddressId = new AddressId("addressId"),
            Status = OrderStatus.Processing,
            Amount = 50m
        };
        
        _mockContext.Orders.Add(order);

        var command = new CreateShipmentCommand(orderId, Guid.NewGuid());

        var result = await _handler.Handle(command, default);

        result.IsSuccess.Should().BeTrue();
        result.Value.OrderId.Value.Should().Be(orderId);
    }

    [Fact]
    public async Task CreateShipment_ShouldFail_WhenOrderNotFound()
    {
        var command = new CreateShipmentCommand(Guid.NewGuid(), Guid.NewGuid());

        var result = await _handler.Handle(command, default);

        result.IsFailed.Should().BeTrue();
    }
    
    [Fact]
    public void CreateShipment_ShouldReturnError_WhenOrderIdEmpty()
    {
        var command = new CreateShipmentCommand(Guid.Empty, Guid.NewGuid());
        var result = _validator.TestValidate(command);

        result.ShouldHaveValidationErrorFor(c => c.OrderId);
    }
    
    [Fact]
    public void CreateShipment_ShouldReturnError_WhenCarrierIdEmpty()
    {
        var command = new CreateShipmentCommand(Guid.NewGuid(), Guid.Empty);
        var result = _validator.TestValidate(command);

        result.ShouldHaveValidationErrorFor(c => c.CarrierId);
    }
}