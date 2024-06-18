namespace Order.Application.Payments.Commands;

using Interfaces;
using Domain.Entities;
using Domain.Enums;

public class CreatePaymentHandler : IRequestHandler<CreatePaymentCommand, Result<Unit>>
{
    private readonly IApplicationDbContext _context;

    public CreatePaymentHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result<Unit>> Handle(CreatePaymentCommand request, CancellationToken cancellationToken)
    {
        var provider = await _context.Providers.FirstOrDefaultAsync(p =>
            p.Id == new ProviderId(request.ProviderId), cancellationToken);
        
        if (provider == null) return Result.Fail($"Provider {request.ProviderId} not found");
        
        var payment = new Payment
        {
            Id = new PaymentId(Guid.NewGuid()),
            CheckoutId = new CheckoutId(request.CheckoutId),
            ProviderId = provider.Id,
            Amount = request.Amount,
            Status = request.Status == "COMPLETED"
                ? PaymentStatus.Approved
                : PaymentStatus.Rejected,
        };
        
        var order = await _context.Orders.FirstOrDefaultAsync(o =>
            o.CheckoutId == new CheckoutId(request.CheckoutId), cancellationToken);

        order?.AddPayment(payment);

        _context.Payments.Add(payment);

        await _context.SaveChangesAsync(cancellationToken);

        return Result.Ok();
    }
}