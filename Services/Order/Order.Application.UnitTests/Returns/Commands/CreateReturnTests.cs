namespace Order.Application.UnitTests.Returns.Commands;

using Domain.Entities;
using Application.Returns.Commands;

public class CreateReturnTests
{
    private readonly MockDbContext _mockContext;
    private readonly CreateReturnHandler _handler;
    private readonly CreateReturnValidator _validator;
    
    public CreateReturnTests()
    {
        _mockContext = new MockDbContext();
        _handler = new CreateReturnHandler(_mockContext.Context.Object);
        _validator = new CreateReturnValidator();
    }

    [Fact]
    public async Task CreateReturn_ShouldSucceed_WhenRequestValid()
    {
        var orderItemId = Guid.NewGuid();

        var orderItem = new OrderItem
        {
            Id = new OrderItemId(orderItemId),
            OrderId = new OrderId(Guid.NewGuid()),
            ProductId = new ProductId("productId"),
            UnitPrice = 10m,
            Quantity = 5
        };
        
        _mockContext.OrderItems.Add(orderItem);

        var command = new CreateReturnCommand(orderItemId, 2, "reason");

        var result = await _handler.Handle(command, default);

        result.IsSuccess.Should().BeTrue();
        result.Value.OrderItemId.Value.Should().Be(orderItemId);
    }

    [Fact]
    public async Task CreateReturn_ShouldFail_WhenOrderItemNotFound()
    {
        var command = new CreateReturnCommand(Guid.NewGuid(), 2, "reason");

        var result = await _handler.Handle(command, default);

        result.IsFailed.Should().BeTrue();
    }

    [Fact]
    public void CreateReturn_ShouldReturnError_WhenOrderItemIdEmpty()
    {
        var command = new CreateReturnCommand(Guid.Empty, 5, "reason");
        var result = _validator.TestValidate(command);

        result.ShouldHaveValidationErrorFor(c => c.OrderItemId);
    }
    
    [Fact]
    public void CreateReturn_ShouldReturnError_WhenQuantityZero()
    {
        var command = new CreateReturnCommand(Guid.NewGuid(), 0, "reason");
        var result = _validator.TestValidate(command);

        result.ShouldHaveValidationErrorFor(c => c.Quantity);
    }
}