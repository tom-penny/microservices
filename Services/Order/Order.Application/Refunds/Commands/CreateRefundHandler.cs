namespace Order.Application.Refunds.Commands;

using Domain.Entities;
using Interfaces;

public class CreateRefundHandler : IRequestHandler<CreateRefundCommand, Result<Refund>>
{
    private readonly IApplicationDbContext _context;

    public CreateRefundHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result<Refund>> Handle(CreateRefundCommand request, CancellationToken cancellationToken)
    {
        var refund = new Refund { Id = new RefundId(Guid.NewGuid()) };

        foreach (var returnId in request.ReturnIds)
        {
            var @return = await _context.Returns.FirstOrDefaultAsync(r =>
                r.Id == new ReturnId(returnId), cancellationToken);

            if (@return == null) return Result.Fail($"Return {returnId} not found");

            @return.RefundId = refund.Id;
            refund.Returns.Add(@return);
        }

        _context.Refunds.Add(refund);

        await _context.SaveChangesAsync(cancellationToken);

        return Result.Ok(refund);
    }
}