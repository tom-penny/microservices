namespace Order.Application.UnitTests.Orders.Commands;

using Application.Orders.Commands;

public class CreateOrderTests
{
    private readonly MockDbContext _mockContext;
    private readonly CreateOrderHandler _handler;
    private readonly CreateOrderValidator _validator;
    
    public CreateOrderTests()
    {
        _mockContext = new MockDbContext();

        // var payment = new Payment
        // {
        //     Id = new PaymentId(Guid.NewGuid()),
        //     CheckoutId = new CheckoutId("checkoutId"),
        //     ProviderId = new ProviderId(Guid.NewGuid()),
        //     Amount = 50m,
        //     Status = PaymentStatus.Approved
        // };
        //
        // _mockContext.Payments.Add(payment);
        
        _handler = new CreateOrderHandler(_mockContext.Context.Object);
        _validator = new CreateOrderValidator();
    }

    [Fact]
    public async Task CreateOrder_ShouldSucceed_WhenRequestValid()
    {
        var command = new CreateOrderCommand
        {
            CheckoutId = "checkoutId",
            CustomerId = "customerId",
            AddressId = "addressId",
            Amount = 50m,
            Items = new List<CreateOrderItem>()
        };
        
        var result = await _handler.Handle(command, default);

        result.IsSuccess.Should().BeTrue();
    }

    [Fact]
    public void CreateOrder_ShouldReturnError_WhenCheckoutIdEmpty()
    {
        var command = new CreateOrderCommand { CheckoutId = string.Empty };
        var result = _validator.TestValidate(command);

        result.ShouldHaveValidationErrorFor(c => c.CheckoutId);
    }
    
    [Fact]
    public void CreateOrder_ShouldReturnError_WhenCustomerIdEmpty()
    {
        var command = new CreateOrderCommand { CustomerId = string.Empty };
        var result = _validator.TestValidate(command);

        result.ShouldHaveValidationErrorFor(c => c.CustomerId);
    }
    
    [Fact]
    public void CreateOrder_ShouldReturnError_WhenAddressIdEmpty()
    {
        var command = new CreateOrderCommand { AddressId = string.Empty };
        var result = _validator.TestValidate(command);

        result.ShouldHaveValidationErrorFor(c => c.AddressId);
    }
    
    [Fact]
    public void CreateOrder_ShouldReturnError_WhenAmountZero()
    {
        var command = new CreateOrderCommand { Amount = decimal.Zero };
        var result = _validator.TestValidate(command);

        result.ShouldHaveValidationErrorFor(c => c.Amount);
    }
    
    [Fact]
    public void CreateOrder_ShouldReturnError_WhenItemsEmpty()
    {
        var command = new CreateOrderCommand { Items = new List<CreateOrderItem>() };
        var result = _validator.TestValidate(command);

        result.ShouldHaveValidationErrorFor(c => c.Items);
    }

    [Fact]
    public void CreateOrder_ShouldReturnError_WhenAnyItemProductIdEmpty()
    {
        var command = new CreateOrderCommand
        {
            Items = new List<CreateOrderItem> { new (string.Empty, 5, 10m) }
        };

        var result = _validator.TestValidate(command);

        result.ShouldHaveValidationErrorFor("Items[0].ProductId");
    }
    
    [Fact]
    public void CreateOrder_ShouldReturnError_WhenAnyItemQuantityZero()
    {
        var command = new CreateOrderCommand
        {
            Items = new List<CreateOrderItem> { new ("productId", 0, 10m) }
        };

        var result = _validator.TestValidate(command);

        result.ShouldHaveValidationErrorFor("Items[0].Quantity");
    }
    
    [Fact]
    public void CreateOrder_ShouldReturnError_WhenAnyItemUnitPriceZero()
    {
        var command = new CreateOrderCommand
        {
            Items = new List<CreateOrderItem> { new ("productId", 5, 0.0m) }
        };

        var result = _validator.TestValidate(command);

        result.ShouldHaveValidationErrorFor("Items[0].UnitPrice");
    }
}