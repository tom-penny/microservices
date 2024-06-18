namespace Order.API.Mappers;

using Domain.Entities;
using Models.Responses;

public static class OrderMapper
{
    public static OrderResponse ToResponse(this Order order)
    {
        return new OrderResponse
        {
            Id = order.Id.Value.ToString(),
            CheckoutId = order.CheckoutId.Value,
            CustomerId = order.CustomerId.Value,
            AddressId = order.AddressId.Value,
            Status = order.Status.ToString(),
            Amount = order.Amount,
            Items = order.Items.Select(i => i.ToResponse()).ToList(),
            PaymentId = order.PaymentId?.Value.ToString()
        };
    }
}