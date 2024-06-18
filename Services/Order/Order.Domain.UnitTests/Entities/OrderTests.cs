namespace Order.Domain.UnitTests.Entities;

using Domain.Entities;
using Domain.Enums;
using Domain.Events;

public class OrderTests
{
    private readonly Order _order;

    public OrderTests()
    {
        _order = new Order
        {
            Id = new OrderId(Guid.NewGuid()),
            CheckoutId = new CheckoutId("checkoutId"),
            CustomerId = new CustomerId("customerId"),
            AddressId = new AddressId("addressId"),
            Status = OrderStatus.Pending,
            Amount = 50m
        };
    }
    
    [Fact]
    public void SetConfirmed_ShouldSetStatusToConfirmed()
    {
        _order.SetConfirmed();

        _order.Status.Should().Be(OrderStatus.Confirmed);
    }

    [Fact]
    public void SetConfirmed_ShouldAddOrderConfirmedEvent()
    {
        _order.SetConfirmed();

        _order.Events.Should().Contain(e =>
            e.GetType() == typeof(OrderConfirmed));
    }
    
    [Fact]
    public void SetProcessing_ShouldSetStatusToProcessing()
    {
        _order.SetProcessing();

        _order.Status.Should().Be(OrderStatus.Processing);
    }

    [Fact]
    public void SetProcessing_ShouldAddOrderProcessingEvent()
    {
        _order.SetProcessing();

        _order.Events.Should().Contain(e =>
            e.GetType() == typeof(OrderProcessing));
    }
    
    [Fact]
    public void SetCompleted_ShouldSetStatusToCompleted()
    {
        _order.SetCompleted();

        _order.Status.Should().Be(OrderStatus.Completed);
    }

    [Fact]
    public void SetCompleted_ShouldAddOrderCompletedEvent()
    {
        _order.SetCompleted();

        _order.Events.Should().Contain(e =>
            e.GetType() == typeof(OrderCompleted));
    }
    
    [Fact]
    public void SetCancelled_ShouldSetStatusToCancelled()
    {
        _order.SetCancelled();

        _order.Status.Should().Be(OrderStatus.Cancelled);
    }

    [Fact]
    public void SetCancelled_ShouldAddOrderCancelledEvent()
    {
        _order.SetCancelled();

        _order.Events.Should().Contain(e =>
            e.GetType() == typeof(OrderCancelled));
    }

    [Fact]
    public void AddPayment_ShouldUpdatePaymentId()
    {
        var payment = new Payment
        {
            Id = new PaymentId(Guid.NewGuid()),
            CheckoutId = new CheckoutId("checkoutId"),
            ProviderId = new ProviderId(Guid.NewGuid()),
            Status = PaymentStatus.Approved,
            Amount = 50m
        };
        
        _order.AddPayment(payment);

        _order.PaymentId.Should().Be(payment.Id);
    }

    [Fact]
    public void AddPayment_ShouldSetStatusToConfirmed_WhenPaymentApproved()
    {
        var payment = new Payment
        {
            Id = new PaymentId(Guid.NewGuid()),
            CheckoutId = new CheckoutId("checkoutId"),
            ProviderId = new ProviderId(Guid.NewGuid()),
            Status = PaymentStatus.Approved,
            Amount = 50m
        };
        
        _order.AddPayment(payment);

        _order.Status.Should().Be(OrderStatus.Confirmed);
    }
    
    [Fact]
    public void AddPayment_ShouldSetStatusToCancelled_WhenPaymentRejected()
    {
        var payment = new Payment
        {
            Id = new PaymentId(Guid.NewGuid()),
            CheckoutId = new CheckoutId("checkoutId"),
            ProviderId = new ProviderId(Guid.NewGuid()),
            Status = PaymentStatus.Rejected,
            Amount = 50m
        };
        
        _order.AddPayment(payment);

        _order.Status.Should().Be(OrderStatus.Cancelled);
    }
}