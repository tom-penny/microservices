namespace Order.API.Mappers;

using Domain.Entities;
using Models.Responses;

public static class OrderItemMapper
{
    public static OrderItemResponse ToResponse(this OrderItem item)
    {
        return new OrderItemResponse
        {
            Id = item.Id.Value.ToString(),
            OrderId = item.OrderId.Value.ToString(),
            ProductId = item.ProductId.Value,
            Quantity = item.Quantity,
            UnitPrice = item.UnitPrice
        };
    }
}