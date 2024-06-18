namespace Order.Application.UnitTests.Orders.Queries;

using Domain.Entities;
using Domain.Enums;
using Application.Orders.Queries;

public class GetOrderByIdTests
{
    private readonly MockDbContext _mockContext;
    private readonly GetOrderByIdHandler _handler;
    private readonly GetOrderByIdValidator _validator;

    public GetOrderByIdTests()
    {
        _mockContext = new MockDbContext();
        _handler = new GetOrderByIdHandler(_mockContext.Context.Object);
        _validator = new GetOrderByIdValidator();
    }

    [Fact]
    public async Task GetOrderById_ShouldSucceed_WhenRequestValid()
    {
        var orderId = Guid.NewGuid();

        var order1 = new Order
        {
            Id = new OrderId(orderId),
            CheckoutId = new CheckoutId("checkoutId1"),
            CustomerId = new CustomerId("customerId1"),
            AddressId = new AddressId("addressId1"),
            Status = OrderStatus.Pending,
            Amount = 50m
        };

        var order2 = new Order
        {
            Id = new OrderId(Guid.NewGuid()),
            CheckoutId = new CheckoutId("checkoutId2"),
            CustomerId = new CustomerId("customerId2"),
            AddressId = new AddressId("addressId2"),
            Status = OrderStatus.Pending,
            Amount = 50m
        };

        _mockContext.Orders.AddRange(new List<Order> { order1, order2 });
        
        var query = new GetOrderByIdQuery(orderId);

        var result = await _handler.Handle(query, default);

        result.IsSuccess.Should().BeTrue();
        result.Value.Should().BeSameAs(order1);
    }

    [Fact]
    public async Task GetOrderById_ShouldFail_WhenOrderNotFound()
    {
        var order1 = new Order
        {
            Id = new OrderId(Guid.NewGuid()),
            CheckoutId = new CheckoutId("checkoutId1"),
            CustomerId = new CustomerId("customerId1"),
            AddressId = new AddressId("addressId1"),
            Status = OrderStatus.Pending,
            Amount = 50m
        };

        var order2 = new Order
        {
            Id = new OrderId(Guid.NewGuid()),
            CheckoutId = new CheckoutId("checkoutId2"),
            CustomerId = new CustomerId("customerId2"),
            AddressId = new AddressId("addressId2"),
            Status = OrderStatus.Pending,
            Amount = 50m
        };

        _mockContext.Orders.AddRange(new List<Order> { order1, order2 });
        
        var query = new GetOrderByIdQuery(Guid.NewGuid());

        var result = await _handler.Handle(query, default);

        result.IsFailed.Should().BeTrue();
    }

    [Fact]
    public void GetOrderById_ShouldReturnError_WhenIdEmpty()
    {
        var query = new GetOrderByIdQuery(Guid.Empty);
        var result = _validator.TestValidate(query);

        result.ShouldHaveValidationErrorFor(q => q.Id);
    }
}