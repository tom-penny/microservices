using Moq.EntityFrameworkCore;

namespace Order.Application.UnitTests;

using Domain.Entities;
using Application.Interfaces;

public class MockDbContext
{
    public Mock<IApplicationDbContext> Context { get; }

    public List<Order> Orders { get; } = new();
    public List<OrderItem> OrderItems { get; } = new();
    public List<Payment> Payments { get; } = new();
    public List<Provider> Providers { get; } = new();
    public List<Refund> Refunds { get; } = new();
    public List<Return> Returns { get; } = new();
    public List<Shipment> Shipments { get; } = new();

    public MockDbContext()
    {
        Context = new Mock<IApplicationDbContext>();

        Context.Setup(c => c.Orders).ReturnsDbSet(Orders);
        Context.Setup(c => c.OrderItems).ReturnsDbSet(OrderItems);
        Context.Setup(c => c.Payments).ReturnsDbSet(Payments);
        Context.Setup(c => c.Providers).ReturnsDbSet(Providers);
        Context.Setup(c => c.Refunds).ReturnsDbSet(Refunds);
        Context.Setup(c => c.Returns).ReturnsDbSet(Returns);
        Context.Setup(c => c.Shipments).ReturnsDbSet(Shipments);
    }
}