namespace Order.Infrastructure.Messaging.Consumers;

using Messages;
using Application.Orders.Commands;

public class OrderCheckoutConsumer : IConsumer<OrderCheckoutMessage>
{
    private readonly IMediator _mediator;

    public OrderCheckoutConsumer(IMediator mediator)
    {
        _mediator = mediator;
    }
    
    public async Task Consume(ConsumeContext<OrderCheckoutMessage> context)
    {
        var command = new CreateOrderCommand
        {
            CheckoutId = context.Message.CheckoutId,
            CustomerId = context.Message.CustomerId,
            AddressId = context.Message.AddressId,
            Amount = context.Message.TotalAmount,
            Items = context.Message.Items
                .Select(item => new CreateOrderItem
                (
                    item.ProductId,
                    item.Quantity,
                    item.UnitPrice
                ))
                .ToList()
        };

        await _mediator.Send(command, context.CancellationToken);
    }
}