namespace Order.Infrastructure.Messaging.Consumers;

using Messages;
using Application.Orders.Commands;

public class OrderValidationConsumer : IConsumer<OrderValidationMessage>
{
    private readonly IMediator _mediator;

    public OrderValidationConsumer(IMediator mediator)
    {
        _mediator = mediator;
    }
    
    public async Task Consume(ConsumeContext<OrderValidationMessage> context)
    {
        var command = new ValidateOrderCommand(context.Message.OrderId, context.Message.IsValid);

        await _mediator.Send(command, context.CancellationToken);
    }
}