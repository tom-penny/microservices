namespace Order.Application.UnitTests.Payments.Queries;

using Domain.Entities;
using Domain.Enums;
using Application.Payments.Queries;

public class GetPaymentByIdTests
{
    private readonly MockDbContext _mockContext;
    private readonly GetPaymentByIdHandler _handler;
    private readonly GetPaymentByIdValidator _validator;

    public GetPaymentByIdTests()
    {
        _mockContext = new MockDbContext();
        _handler = new GetPaymentByIdHandler(_mockContext.Context.Object);
        _validator = new GetPaymentByIdValidator();
    }
    
    [Fact]
    public async Task GetPaymentById_ShouldSucceed_WhenRequestValid()
    {
        var paymentId = Guid.NewGuid();

        var payment1 = new Payment
        {
            Id = new PaymentId(paymentId),
            CheckoutId = new CheckoutId("checkoutId1"),
            ProviderId = new ProviderId(Guid.NewGuid()),
            Status = PaymentStatus.Approved,
            Amount = 50m
        };

        var payment2 = new Payment
        {
            Id = new PaymentId(Guid.NewGuid()),
            CheckoutId = new CheckoutId("checkoutId2"),
            ProviderId = new ProviderId(Guid.NewGuid()),
            Status = PaymentStatus.Approved,
            Amount = 50m
        };

        _mockContext.Payments.AddRange(new List<Payment> { payment1, payment2 });
        
        var query = new GetPaymentByIdQuery(paymentId);

        var result = await _handler.Handle(query, default);

        result.IsSuccess.Should().BeTrue();
        result.Value.Should().BeSameAs(payment1);
    }

    [Fact]
    public async Task GetPaymentById_ShouldFail_WhenPaymentNotFound()
    {
        var payment1 = new Payment
        {
            Id = new PaymentId(Guid.NewGuid()),
            CheckoutId = new CheckoutId("checkoutId1"),
            ProviderId = new ProviderId(Guid.NewGuid()),
            Status = PaymentStatus.Approved,
            Amount = 50m
        };

        var payment2 = new Payment
        {
            Id = new PaymentId(Guid.NewGuid()),
            CheckoutId = new CheckoutId("checkoutId2"),
            ProviderId = new ProviderId(Guid.NewGuid()),
            Status = PaymentStatus.Approved,
            Amount = 50m
        };
        
        _mockContext.Payments.AddRange(new List<Payment> { payment1, payment2 });

        var query = new GetPaymentByIdQuery(Guid.NewGuid());

        var result = await _handler.Handle(query, default);

        result.IsFailed.Should().BeTrue();
    }

    [Fact]
    public void GetPaymentById_ShouldReturnError_WhenIdEmpty()
    {
        var query = new GetPaymentByIdQuery(Guid.Empty);
        var result = _validator.TestValidate(query);

        result.ShouldHaveValidationErrorFor(q => q.Id);
    }
}