namespace Order.Application.UnitTests.Payments.Commands;

using Domain.Entities;
using Application.Payments.Commands;

public class CreatePaymentTests
{
    private readonly MockDbContext _mockContext;
    private readonly CreatePaymentHandler _handler;
    private readonly CreatePaymentValidator _validator;

    public CreatePaymentTests()
    {
        _mockContext = new MockDbContext();
        _handler = new CreatePaymentHandler(_mockContext.Context.Object);
        _validator = new CreatePaymentValidator();
    }

    [Fact]
    public async Task CreatePayment_ShouldSucceed_WhenRequestValid()
    {
        var providerId = Guid.NewGuid();

        var provider = new Provider { Id = new ProviderId(providerId), Name = "provider" };
        
        _mockContext.Providers.Add(provider);

        var command = new CreatePaymentCommand
        {
            CheckoutId = "checkoutId",
            ProviderId = providerId,
            Status = "COMPLETED",
            Amount = 50m
        };
        
        var result = await _handler.Handle(command, default);

        result.IsSuccess.Should().BeTrue();
    }

    [Fact]
    public async Task CreatePayment_ShouldFail_WhenProviderNotFound()
    {
        var command = new CreatePaymentCommand
        {
            CheckoutId = "checkoutId",
            ProviderId = Guid.NewGuid(),
            Status = "COMPLETED",
            Amount = 50m
        };
        
        var result = await _handler.Handle(command, default);

        result.IsFailed.Should().BeTrue();
    }
    
    [Fact]
    public void CreatePayment_ShouldReturnError_WhenCheckoutIdEmpty()
    {
        var command = new CreatePaymentCommand
        {
            CheckoutId = string.Empty,
            ProviderId = Guid.NewGuid(),
            Status = "COMPLETED",
            Amount = 10m
        };
        
        var result = _validator.TestValidate(command);

        result.ShouldHaveValidationErrorFor(c => c.CheckoutId);
    }
    
    [Fact]
    public void CreatePayment_ShouldReturnError_WhenProviderIdEmpty()
    {
        var command = new CreatePaymentCommand
        {
            CheckoutId = "checkoutId",
            ProviderId = Guid.Empty,
            Status = "COMPLETED",
            Amount = 10m
        };
        
        var result = _validator.TestValidate(command);

        result.ShouldHaveValidationErrorFor(c => c.ProviderId);
    }
    
    [Fact]
    public void CreatePayment_ShouldReturnError_WhenStatusEmpty()
    {
        var command = new CreatePaymentCommand
        {
            CheckoutId = "checkoutId",
            ProviderId = Guid.NewGuid(),
            Status = string.Empty,
            Amount = 10m
        };
        
        var result = _validator.TestValidate(command);

        result.ShouldHaveValidationErrorFor(c => c.Status);
    }
    
    [Fact]
    public void CreatePayment_ShouldReturnError_WhenAmountZero()
    {
        var command = new CreatePaymentCommand
        {
            CheckoutId = "checkoutId",
            ProviderId = Guid.NewGuid(),
            Status = "COMPLETED",
            Amount = decimal.Zero
        };
        
        var result = _validator.TestValidate(command);

        result.ShouldHaveValidationErrorFor(c => c.Amount);
    }
}