namespace Order.Application.UnitTests.Returns.Commands;

using Domain.Entities;
using Application.Returns.Commands;

public class ConfirmReturnTests
{
    private readonly MockDbContext _mockContext;
    private readonly ConfirmReturnHandler _handler;
    private readonly ConfirmReturnValidator _validator;
    
    public ConfirmReturnTests()
    {
        _mockContext = new MockDbContext();
        _handler = new ConfirmReturnHandler(_mockContext.Context.Object);
        _validator = new ConfirmReturnValidator();
    }

    [Fact]
    public async Task ConfirmReturn_ShouldSucceed_WhenRequestValid()
    {
        var returnId = Guid.NewGuid();
        
        var @return = new Return
        {
            Id = new ReturnId(returnId),
            OrderItemId = new OrderItemId(Guid.NewGuid()),
            IsReceived = false,
            Reason = "reason",
            Quantity = 5
        };
        
        _mockContext.Returns.Add(@return);

        var command = new ConfirmReturnCommand(returnId);

        var result = await _handler.Handle(command, default);

        result.IsSuccess.Should().BeTrue();
        @return.IsReceived.Should().BeTrue();
    }

    [Fact]
    public async Task ConfirmReturn_ShouldFail_WhenReturnNotFound()
    {
        var command = new ConfirmReturnCommand(Guid.NewGuid());

        var result = await _handler.Handle(command, default);

        result.IsFailed.Should().BeTrue();
    }
    
    [Fact]
    public void ConfirmReturn_ShouldReturnError_WhenIdEmpty()
    {
        var command = new ConfirmReturnCommand(Guid.Empty);
        var result = _validator.TestValidate(command);

        result.ShouldHaveValidationErrorFor(c => c.Id);
    }
}