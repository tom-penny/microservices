namespace Order.API.Mappers;

using Domain.Entities;
using Models.Responses;

public static class ReturnMapper
{
    public static ReturnResponse ToResponse(this Return @return)
    {
        return new ReturnResponse
        {
            Id = @return.Id.Value.ToString(),
            OrderItemId = @return.OrderItemId.Value.ToString(),
            IsReceived = @return.IsReceived,
            Quantity = @return.Quantity,
            Reason = @return.Reason,
            RefundId = @return.RefundId?.Value.ToString()
        };
    }
}