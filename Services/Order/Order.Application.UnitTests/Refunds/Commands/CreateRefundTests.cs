namespace Order.Application.UnitTests.Refunds.Commands;

using Domain.Entities;
using Application.Refunds.Commands;

public class CreateRefundTests
{
    private readonly MockDbContext _mockContext;
    private readonly CreateRefundHandler _handler;
    private readonly CreateRefundValidator _validator;

    public CreateRefundTests()
    {
        _mockContext = new MockDbContext();
        _handler = new CreateRefundHandler(_mockContext.Context.Object);
        _validator = new CreateRefundValidator();
    }

    [Fact]
    public async Task CreateRefund_ShouldSucceed_WhenRequestValid()
    {
        var returnId = Guid.NewGuid();
        
        var @return = new Return
        {
            Id = new ReturnId(returnId),
            OrderItemId = new OrderItemId(Guid.NewGuid()),
            IsReceived = true,
            Reason = "reason",
            Quantity = 5
        };
        
        _mockContext.Returns.Add(@return);

        var command = new CreateRefundCommand(new List<Guid> { returnId });

        var result = await _handler.Handle(command, default);
        
        result.IsSuccess.Should().BeTrue();
        result.Value.Id.Should().Be(@return.RefundId);
    }

    [Fact]
    public async Task CreateRefund_ShouldFail_WhenAnyReturnNotFound()
    {
        var command = new CreateRefundCommand(new List<Guid> { Guid.NewGuid() });

        var result = await _handler.Handle(command, default);
        
        result.IsFailed.Should().BeTrue();
    }
    
    [Fact]
    public void CreateRefund_ShouldReturnError_WhenReturnIdsEmpty()
    {
        var command = new CreateRefundCommand(new List<Guid>());
        var result = _validator.TestValidate(command);

        result.ShouldHaveValidationErrorFor(c => c.ReturnIds);
    }
    
    [Fact]
    public void CreateRefund_ShouldReturnError_WhenAnyReturnIdEmpty()
    {
        var command = new CreateRefundCommand(new List<Guid> { Guid.Empty });
        var result = _validator.TestValidate(command);

        result.ShouldHaveValidationErrorFor("ReturnIds[0]");
    }
}