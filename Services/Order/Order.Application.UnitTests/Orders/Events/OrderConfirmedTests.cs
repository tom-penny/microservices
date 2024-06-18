using Microsoft.Extensions.Logging;

namespace Order.Application.UnitTests.Orders.Events;

using Domain.Entities;
using Domain.Enums;
using Domain.Events;
using Application.Interfaces;
using Application.Orders.Events;
using IntegrationEvents;

public class OrderConfirmedTests
{
    private readonly Mock<IEventBus> _mockEventBus;
    private readonly OrderConfirmedHandler _handler;

    public OrderConfirmedTests()
    {
        _mockEventBus = new Mock<IEventBus>();
        var mockLogger = new Mock<ILogger<OrderConfirmedHandler>>();
        _handler = new OrderConfirmedHandler(mockLogger.Object, _mockEventBus.Object);
    }

    [Fact]
    public async Task OrderConfirmed_ShouldBeHandled_WhenDispatched()
    {
        var orderId = Guid.NewGuid();
        
        var order = new Order
        {
            Id = new OrderId(orderId),
            CheckoutId = new CheckoutId("checkoutId"),
            CustomerId = new CustomerId("customerId"),
            AddressId = new AddressId("addressId"),
            Status = OrderStatus.Confirmed,
            Amount = 50m
        };

        var domainEvent = new OrderConfirmed(order);

        await _handler.Handle(domainEvent, default);

        _mockEventBus.Verify(b =>
            b.Publish(It.Is<OrderConfirmedEvent>(e =>
                e.OrderId == orderId), default), Times.Once);
    }
}