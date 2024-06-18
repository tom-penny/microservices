using Microsoft.AspNetCore.Mvc;

namespace Order.API.Controllers;

using Mappers;
using Models.Requests;
using Application.Payments.Commands;
using Application.Payments.Queries;

[ApiController]
public class PaymentController : ControllerBase
{
    private readonly IMediator _mediator;

    public PaymentController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("/api/payments/{id:guid}")]
    public async Task<IActionResult> GetPayment([FromRoute] Guid id, CancellationToken cancellationToken)
    {
        var query = new GetPaymentByIdQuery(id);
        var result = await _mediator.Send(query, cancellationToken);
        return result.IsSuccess ? Ok(result.Value.ToResponse()) : NotFound(result.Errors);
    }

    [HttpPost("/api/payments/confirm")]
    public async Task<IActionResult> ConfirmPayment([FromBody] ConfirmPaymentRequest request,
        CancellationToken cancellationToken)
    {
        var command = new CreatePaymentCommand
        {
            CheckoutId = request.CheckoutId,
            ProviderId = request.ProviderId,
            Status = request.Status,
            Amount = request.Amount
        };
        var result = await _mediator.Send(command, cancellationToken);
        return result.IsSuccess ? Ok() : NotFound(result.Errors);
    }
}