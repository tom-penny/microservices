namespace Order.Domain.Entities;

using Enums;
using Primitives;
using Events;

public record OrderId(Guid Value);
public record CustomerId(string Value);
public record AddressId(string Value);

public class Order : BaseEntity
{
    public required OrderId Id { get; init; }
    public required CheckoutId CheckoutId { get; init; }
    public required CustomerId CustomerId { get; init; }
    public required AddressId AddressId { get; init; }
    public required OrderStatus Status { get; set; }
    public required decimal Amount { get; init; }
    public List<OrderItem> Items { get; init; } = new();
    public PaymentId? PaymentId { get; set; }

    public void AddPayment(Payment payment)
    {
        PaymentId = payment.Id;
        
        if (Amount == payment.Amount && payment.Status == PaymentStatus.Approved)
        {
            SetConfirmed();
        }
        else
        {
            SetCancelled();
        }
    }
    
    public void SetConfirmed()
    {
        Status = OrderStatus.Confirmed;
        AddDomainEvent(new OrderConfirmed(this));
    }

    public void SetProcessing()
    {
        Status = OrderStatus.Processing;
        AddDomainEvent(new OrderProcessing(this));
    }

    public void SetCompleted()
    {
        Status = OrderStatus.Completed;
        AddDomainEvent(new OrderCompleted(this));
    }

    public void SetCancelled()
    {
        Status = OrderStatus.Cancelled;
        AddDomainEvent(new OrderCancelled(this));
    }
}