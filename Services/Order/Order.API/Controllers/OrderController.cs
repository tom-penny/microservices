using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace Order.API.Controllers;

using Mappers;
using Models.Requests;
using Application.Orders.Commands;
using Application.Orders.Queries;
using Application.Shipments.Commands;

[ApiController]
public class OrderController : ControllerBase
{
    private readonly IMediator _mediator;

    public OrderController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [Authorize(Roles = "customer")]
    [HttpGet("/api/customers/{id}/orders")]
    public async Task<IActionResult> GetAllOrders([FromRoute] string id, CancellationToken cancellationToken)
    {
        var query = new GetAllOrdersQuery(id);
        var result = await _mediator.Send(query, cancellationToken);
        var orders = result.Value.Select(o => o.ToResponse()).ToList();
        return Ok(new { orders });
    }

    [HttpGet("/api/orders/{id:guid}")]
    public async Task<IActionResult> GetOrder([FromRoute] Guid id, CancellationToken cancellationToken)
    {
        var query = new GetOrderByIdQuery(id);
        var result = await _mediator.Send(query, cancellationToken);
        return result.IsSuccess ? Ok(result.Value.ToResponse()) : NotFound(result.Errors);
    }

    [HttpPut("/api/orders/{id:guid}/cancel")]
    public async Task<IActionResult> CancelOrder([FromRoute] Guid id, CancellationToken cancellationToken)
    {
        var command = new CancelOrderCommand(id);
        var result = await _mediator.Send(command, cancellationToken);
        return result.IsSuccess ? Ok() : NotFound(result.Errors);
    }

    [HttpPost("/api/orders/{id:guid}/ship")]
    public async Task<IActionResult> ShipOrder([FromRoute] Guid id,
        [FromBody] CreateShipmentRequest request, CancellationToken cancellationToken)
    {
        var command = new CreateShipmentCommand(id, request.CarrierId);
        var result = await _mediator.Send(command, cancellationToken);
        return result.IsSuccess ? Ok(result.Value.ToResponse()) : NotFound(result.Errors);
    }
}