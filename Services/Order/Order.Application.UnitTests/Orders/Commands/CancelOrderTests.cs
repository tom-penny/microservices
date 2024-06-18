namespace Order.Application.UnitTests.Orders.Commands;

using Domain.Entities;
using Domain.Enums;
using Application.Orders.Commands;

public class CancelOrderTests
{
    private readonly MockDbContext _mockContext;
    private readonly CancelOrderHandler _handler;
    private readonly CancelOrderValidator _validator;
    
    public CancelOrderTests()
    {
        _mockContext = new MockDbContext();
        _handler = new CancelOrderHandler(_mockContext.Context.Object);
        _validator = new CancelOrderValidator();
    }

    [Fact]
    public async Task CancelOrder_ShouldSucceed_WhenRequestValid()
    {
        var orderId = Guid.NewGuid();
        
        var order = new Order
        {
            Id = new OrderId(orderId),
            CheckoutId = new CheckoutId("checkoutId"),
            CustomerId = new CustomerId("customerId"),
            AddressId = new AddressId("addressId"),
            Status = OrderStatus.Pending,
            Amount = 50m
        };
        
        _mockContext.Orders.Add(order);

        var command = new CancelOrderCommand(orderId);

        var result = await _handler.Handle(command, default);

        result.IsSuccess.Should().BeTrue();
        order.Status.Should().Be(OrderStatus.Cancelled);
    }

    [Fact]
    public async Task CancelOrder_ShouldFail_WhenOrderNotFound()
    {
        var command = new CancelOrderCommand(Guid.NewGuid());

        var result = await _handler.Handle(command, default);

        result.IsFailed.Should().BeTrue();
    }
    
    [Fact]
    public void CancelOrder_ShouldReturnError_WhenIdEmpty()
    {
        var command = new CancelOrderCommand(Guid.Empty);
        var result = _validator.TestValidate(command);

        result.ShouldHaveValidationErrorFor(c => c.Id);
    }
}