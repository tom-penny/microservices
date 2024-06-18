namespace Order.Application.Returns.Commands;

using Interfaces;
using Domain.Entities;

public class ConfirmReturnHandler : IRequestHandler<ConfirmReturnCommand, Result<Unit>>
{
    private readonly IApplicationDbContext _context;

    public ConfirmReturnHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result<Unit>> Handle(ConfirmReturnCommand request, CancellationToken cancellationToken)
    {
        var @return = await _context.Returns.FirstOrDefaultAsync(r =>
            r.Id == new ReturnId(request.Id), cancellationToken);

        if (@return == null) return Result.Fail($"Return {request.Id} not found");

        @return.SetReceived();

        await _context.SaveChangesAsync(cancellationToken);

        return Result.Ok();
    }
}