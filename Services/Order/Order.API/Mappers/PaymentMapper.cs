namespace Order.API.Mappers;

using Domain.Entities;
using Models.Responses;

public static class PaymentMapper
{
    public static PaymentResponse ToResponse(this Payment payment)
    {
        return new PaymentResponse
        {
            Id = payment.Id.Value.ToString(),
            CheckoutId = payment.CheckoutId.Value,
            ProviderId = payment.ProviderId.Value.ToString(),
            Status = payment.Status.ToString(),
            Amount = payment.Amount
        };
    }
}