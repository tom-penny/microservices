using Microsoft.EntityFrameworkCore;

namespace Order.Application.UnitTests.Orders.Queries;

using Domain.Entities;
using Domain.Enums;
using Application.Orders.Queries;

public class GetAllOrdersTests
{
    private readonly MockDbContext _mockContext;
    private readonly GetAllOrdersHandler _handler;
    private readonly GetAllOrdersValidator _validator;

    public GetAllOrdersTests()
    {
        _mockContext = new MockDbContext();
        _handler = new GetAllOrdersHandler(_mockContext.Context.Object);
        _validator = new GetAllOrdersValidator();
    }

    [Fact]
    public async Task GetAllOrders_ShouldSucceed_WhenRequestValid()
    {
        var customerId = "customerId";

        var orders = new List<Order>
        {
            new()
            {
                Id = new OrderId(Guid.NewGuid()),
                CheckoutId = new CheckoutId("checkoutId1"),
                CustomerId = new CustomerId(customerId),
                AddressId = new AddressId("addressId1"),
                Status = OrderStatus.Pending,
                Amount = 50m
            },
            new()
            {
                Id = new OrderId(Guid.NewGuid()),
                CheckoutId = new CheckoutId("checkoutId2"),
                CustomerId = new CustomerId(customerId),
                AddressId = new AddressId("addressId2"),
                Status = OrderStatus.Pending,
                Amount = 50m
            }
        };
        
        _mockContext.Orders.AddRange(orders);

        var query = new GetAllOrdersQuery(customerId);

        var result = await _handler.Handle(query, default);

        result.IsSuccess.Should().BeTrue();
        result.Value.Count.Should().Be(2);
    }

    [Fact]
    public async Task GetAllOrders_ShouldSucceed_WhenOrdersEmpty()
    {
        var query = new GetAllOrdersQuery("customerId");

        var result = await _handler.Handle(query, default);

        result.IsSuccess.Should().BeTrue();
        result.Value.Count.Should().Be(0);
    }
    
    [Fact]
    public void GetAllOrders_ShouldReturnError_WhenCustomerIdEmpty()
    {
        var query = new GetAllOrdersQuery(string.Empty);
        var result = _validator.TestValidate(query);

        result.ShouldHaveValidationErrorFor(q => q.CustomerId);
    }
}