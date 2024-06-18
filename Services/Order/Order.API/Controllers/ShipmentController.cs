using Microsoft.AspNetCore.Mvc;

namespace Order.API.Controllers;

using Mappers;
using Models.Requests;
using Application.Shipments.Queries;
using Application.Shipments.Commands;

[ApiController]
public class ShipmentController : ControllerBase
{
    private readonly IMediator _mediator;

    public ShipmentController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("/api/shipments/{id:guid}")]
    public async Task<IActionResult> GetShipment([FromRoute] Guid id, CancellationToken cancellationToken)
    {
        var query = new GetShipmentByIdQuery(id);
        var result = await _mediator.Send(query, cancellationToken);
        return result.IsSuccess ? Ok(result.Value.ToResponse()) : NotFound(result.Errors);
    }

    [HttpPut("/api/shipments/{id:guid}")]
    public async Task<IActionResult> UpdateShipment([FromRoute] Guid id,
        [FromBody] UpdateShipmentRequest request, CancellationToken cancellationToken)
    {
        var command = new UpdateShipmentCommand(id, request.DeliveryDate);
        var result = await _mediator.Send(command, cancellationToken);
        return result.IsSuccess ? Ok() : NotFound(result.Errors);
    }
}