namespace Order.Domain.UnitTests.Entities;

using Domain.Entities;
using Domain.Events;

public class ReturnTests
{
    private readonly Return _return;

    public ReturnTests()
    {
        _return = new Return
        {
            Id = new ReturnId(Guid.NewGuid()),
            OrderItemId = new OrderItemId(Guid.NewGuid()),
            IsReceived = false,
            Reason = "reason",
            Quantity = 2
        };
    }
    
    [Fact]
    public void SetReceived_ShouldSetIsReceivedToTrue()
    {
        _return.SetReceived();

        _return.IsReceived.Should().BeTrue();
    }

    [Fact]
    public void SetReceived_ShouldAddReturnReceivedEvent()
    {
        _return.SetReceived();

        _return.Events.Should().Contain(e =>
            e.GetType() == typeof(ReturnReceived));
    }
}