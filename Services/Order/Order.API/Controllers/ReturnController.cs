using Microsoft.AspNetCore.Mvc;

namespace Order.API.Controllers;

using Mappers;
using Models.Requests;
using Application.Returns.Commands;

[ApiController]
public class ReturnController : ControllerBase
{
    private readonly IMediator _mediator;

    public ReturnController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("/api/customers/{id}/returns")]
    public async Task<IActionResult> CreateReturn([FromRoute] string id, [FromBody] CreateReturnRequest request,
        CancellationToken cancellationToken)
    {
        var command = new CreateReturnCommand(request.OrderItemId, request.Quantity, request.Reason);
        var result = await _mediator.Send(command, cancellationToken);
        return result.IsSuccess ? Ok(result.Value.ToResponse()) : NotFound(result.Errors);
    }

    [HttpPut("/api/returns/{id:guid}/confirm")]
    public async Task<IActionResult> ConfirmReturn([FromRoute] Guid id, CancellationToken cancellationToken)
    {
        var command = new ConfirmReturnCommand(id);
        var result = await _mediator.Send(command, cancellationToken);
        return result.IsSuccess ? Ok() : NotFound(result.Errors);
    }
    
}