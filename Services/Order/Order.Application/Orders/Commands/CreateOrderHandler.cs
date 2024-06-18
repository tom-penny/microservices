namespace Order.Application.Orders.Commands;

using Domain.Entities;
using Domain.Enums;
using Interfaces;

public class CreateOrderHandler : IRequestHandler<CreateOrderCommand, Result<Unit>>
{
    private readonly IApplicationDbContext _context;

    public CreateOrderHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result<Unit>> Handle(CreateOrderCommand request, CancellationToken cancellationToken)
    {
        var order = new Order
        {
            Id = new OrderId(Guid.NewGuid()),
            CheckoutId = new CheckoutId(request.CheckoutId),
            AddressId = new AddressId(request.AddressId),
            CustomerId = new CustomerId(request.CustomerId),
            Amount = request.Amount,
            Status = OrderStatus.Pending
        };
        
        foreach (var item in request.Items)
        {
            var orderItem = new OrderItem
            {
                Id = new OrderItemId(Guid.NewGuid()),
                OrderId = order.Id,
                ProductId = new ProductId(item.ProductId),
                UnitPrice = item.UnitPrice,
                Quantity = item.Quantity
            };
            
            order.Items.Add(orderItem);
        }

        var payment = await _context.Payments.FirstOrDefaultAsync(p =>
            p.CheckoutId == new CheckoutId(request.CheckoutId), cancellationToken);

        if (payment != null)
        {
            order.AddPayment(payment);
        }

        _context.Orders.Add(order);
        
        await _context.SaveChangesAsync(cancellationToken);

        return Result.Ok();
    }
}