namespace Order.Application.Payments.Queries;

using Interfaces;
using Domain.Entities;

public class GetPaymentByIdHandler : IRequestHandler<GetPaymentByIdQuery, Result<Payment>>
{
    private readonly IApplicationDbContext _context;

    public GetPaymentByIdHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result<Payment>> Handle(GetPaymentByIdQuery request, CancellationToken cancellationToken)
    {
        var payment = await _context.Payments.FirstOrDefaultAsync(p =>
            p.Id == new PaymentId(request.Id), cancellationToken);
            
        return payment != null
            ? Result.Ok(payment)
            : Result.Fail($"Payment {request.Id} not found");
    }
}