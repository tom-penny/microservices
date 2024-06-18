namespace Order.Application.UnitTests.Orders.Commands;

using Domain.Entities;
using Domain.Enums;
using Application.Orders.Commands;

public class ValidateOrderTests
{
    private readonly MockDbContext _mockContext;
    private readonly ValidateOrderHandler _handler;
    private readonly ValidateOrderValidator _validator;

    public ValidateOrderTests()
    {
        _mockContext = new MockDbContext();
        _handler = new ValidateOrderHandler(_mockContext.Context.Object);
        _validator = new ValidateOrderValidator();
    }

    [Fact]
    public async Task ValidateOrder_ShouldSucceed_WhenRequestValid()
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

        var command = new ValidateOrderCommand(orderId, true);
        
        var result = await _handler.Handle(command, default);

        result.IsSuccess.Should().BeTrue();
        order.Status.Should().Be(OrderStatus.Processing);
    }

    [Fact]
    public async Task ValidateOrder_ShouldFail_WhenOrderNotFound()
    {
        var command = new ValidateOrderCommand(Guid.NewGuid(), true);
        
        var result = await _handler.Handle(command, default);

        result.IsFailed.Should().BeTrue();
    }
    
    [Fact]
    public void ValidateOrder_ShouldReturnError_WhenOrderIdEmpty()
    {
        var command = new ValidateOrderCommand(Guid.Empty, true);
        var result = _validator.TestValidate(command);

        result.ShouldHaveValidationErrorFor(c => c.OrderId);
    }
}